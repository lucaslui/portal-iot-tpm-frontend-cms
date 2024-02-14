import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './sidebar.module.scss'

import DefaultPhoto from '../../assets/imgs/user.svg'
import AccountContext from '../../contexts/account-context'
import { loadUserProfile } from '../../services/user-service'
import { UserProfile } from '../../models/user'

type Props = {
    items?: any
    sidebarOpened?: boolean
    toggleSidebar?: any
}

const Sidebar: React.FC<Props> = (props: Props) => {
    const { getCurrentAccount, removeCurrentAccount } = useContext(AccountContext)

    const [profile, setProfile] = useState({
        name: '',
        imageUrl: '',
    })

    const navigate = useNavigate()

    const logout = (): void => {
        removeCurrentAccount()
        navigate('/auth/signin')
    }

    useEffect((): void => {
        fetchUserProfile()
            .then((userProfile) => {
                setProfile({
                    ...profile,
                    name: userProfile.name,
                    imageUrl: userProfile.imageUrl,
                })
            })
            .catch((error) => console.log(error))
    }, [])

    const fetchUserProfile = async (): Promise<UserProfile> => {
        const userId = getCurrentAccount()?.userId
        const userProfile = await loadUserProfile({ userId })
        return userProfile
    }

    return (
        <div className={styles.sidebar} data-status={props.sidebarOpened ? 'open' : 'closed'}>
            <button className={styles.toggle} onClick={props.toggleSidebar}>
                <i className="fas fa-angle-double-left" />
            </button>
            <div className={styles.profile}>
                <img src={profile.imageUrl ? profile.imageUrl : DefaultPhoto} alt="photo" />
                <span> {profile.name} </span>
                <Link to="/edit-profile" rel="author" className={styles.link}>Editar Perfil</Link>
            </div>
            <hr />
            <nav className={styles.menu}>
                {props.items.map((item: any, index: number) => <SubMenu items={item} key={index} />)}
            </nav>
            <div className={styles.logout} onClick={logout}>
                <i className="fas fa-sign-out-alt" />
                <span> Sair da Conta </span>
            </div>
        </div >
    )
}

export default Sidebar

const SubMenu: React.FC<Props> = (props: Props) => {
    const [children, setChildren] = useState(false)

    const showchildren = (): void => setChildren(!children)

    const subItemPath = props.items.children ? props.items.children[0].path : ''

    return (
        <>
            <Link
                className={styles.item}
                to={subItemPath}
                onClick={props.items.children && showchildren}>
                <div className={styles.label}>
                    {props.items.icon}
                    <span>{props.items.name}</span>
                </div>
                <div>
                    {props.items.children && children ? <i className="fas fa-sort-up" /> : props.items.children ? <i className="fas fa-sort-down" /> : null}
                </div>
            </Link>
            {children &&
                props.items.children.map((item: any, index: number) => {
                    return (
                        <Link className={styles.subitem} to={`${item.path}`} key={index}>
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
        </>
    )
}
function getCurrentAccount() {
    throw new Error('Function not implemented.')
}

