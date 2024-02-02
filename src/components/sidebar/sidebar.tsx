import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './sidebar.module.scss'

import DefaultPhoto from '../../assets/imgs/user.svg'
import AccountContext from '../../contexts/account-context'

type Props = {
    items?: any
    sidebarOpened?: boolean
    toggleSidebar?: any
}

const Sidebar: React.FC<Props> = (props: Props) => {
    const { removeCurrentAccount } = useContext(AccountContext)
    const navigate = useNavigate()

    const logout = (): void => {
        removeCurrentAccount()
        navigate('/auth/signin')
    }

    return (
        <div className={styles.sidebar} data-status={props.sidebarOpened ? 'open' : 'closed'}>
            <button className={styles.toggle} onClick={props.toggleSidebar}>
                <i className="fas fa-angle-double-left" />
            </button>
            <div className={styles.profile}>
                <img src={DefaultPhoto} alt="photo" />
                <span> Nome do Usuário </span>
                <Link to="/edit-profile" rel="author" className={styles.link}>Editar Perfil</Link>
            </div>
            <hr />
            <nav className={styles.menu}>
                {props.items.map((item, index) => <SubMenu items={item} key={index} />)}
            </nav>
            <div className={styles.logout} onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Sair da Conta </span>
            </div>
        </div >
    )
}

export default Sidebar

const SubMenu: React.FC<Props> = (props: Props) => {
    const [children, setChildren] = useState(false)

    const showchildren = (): void => setChildren(!children)

    const subItemPath = props.items.children && props.items.children[0].path
    
    return (
        <>
            <Link
                className={styles.item}
                to={!props.items.children && `${props.items.path}`}
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
                props.items.children.map((item, index) => {
                    return (
                        <Link className={styles.subitem} to={`${item.path}`} key={index}>
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
        </>
    )
}
