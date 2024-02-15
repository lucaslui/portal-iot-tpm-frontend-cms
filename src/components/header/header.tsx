import React from 'react'

import styles from './header.module.scss'

import HeaderLogo from '../header-logo/header-logo'
import HeaderDropdown from '../header-dropdown/header-dropdown'

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <HeaderLogo/>
            <HeaderDropdown />
        </header>
    )
}

export default Header




