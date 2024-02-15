import React from 'react'
import { Link } from 'react-router-dom'

import styles from './header-logo.module.scss'

import LogoImage from '../../assets/imgs/logo.svg'

const HeaderLogo: React.FC = () => {
    return (
        <Link to='/' className={styles.header_logo}>
            <img src={LogoImage} alt="logo" />
            <div>
                <h1> &lt; <span> Internet of Things P-Library </span>/&gt; </h1>
                <h2>
                    Aiming to disseminate knowledge about the Internet of Things in a simple, practical and objective way
                </h2>
            </div>
        </Link>
    )
}

export default HeaderLogo

