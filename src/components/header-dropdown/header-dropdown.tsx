import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './header-dropdown.module.scss'

import DefaultUserImage from '../../assets/imgs/user.svg'
import AccountContext from '../../contexts/account-context'
import { loadUserProfile } from '../../services/user-service'
import { UserProfile } from '../../models/user'

const dropdownItems = [
    {
        name: 'Profile',
        path: 'settings/profile',
        icon: <i className="fas fa-user" />
    },
    {
        name: 'Password',
        path: 'settings/password',
        icon: <i className="fas fa-sticky-note" />
    },
]

const HeaderDropdown: React.FC = () => {
    const { getCurrentAccount, removeCurrentAccount } = useContext(AccountContext)

    const navigate = useNavigate()

    const [profile, setProfile] = useState({
        name: '',
        occupation: '',
        imageUrl: '',
    })

    useEffect((): void => {
        fetchUserProfile()
            .then((userProfile) => {
                setProfile({
                    ...profile,
                    name: userProfile.name,
                    occupation: userProfile.occupation,
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

    const logout = (): void => {
        removeCurrentAccount()
        navigate('/auth/signin')
    }

    return (
        <div className={styles.header_dropdown}>
            <div className={styles.profile}>
                <div className={styles.text}>
                    <h3>{profile.name}</h3>
                    <span>{profile.occupation}</span>
                </div>
                <img src={profile.imageUrl ? profile.imageUrl : DefaultUserImage} alt="default-photo" />
            </div>
            <nav className={styles.dropdown_content}>
                {dropdownItems.map((item, index) => (
                    <Link className={styles.item} to={item.path} key={index}>
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
                <hr />
                <div className={styles.logout} onClick={logout}>
                    <i className="fas fa-sign-out-alt" />
                    <span> Sair da Conta </span>
                </div>
            </nav>
        </div>
    )
}

export default HeaderDropdown