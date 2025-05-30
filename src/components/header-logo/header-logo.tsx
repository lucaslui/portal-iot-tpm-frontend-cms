import React from 'react'
import { Link } from 'react-router-dom'

import styles from './header-logo.module.scss'

import LogoImage from '../../assets/imgs/logo.png'

const HeaderLogo: React.FC = () => {
    return (
        <Link to='/' className={styles.header_logo}>
            <img src={LogoImage} alt="logo" />
            <div className={styles.title}>
                <h1> Portal <strong>IoT-TpM</strong> Unicamp </h1>
                <h2> Conteúdo sobre Internet das Coisas de forma simples, prática e objetiva </h2>
            </div>
        </Link>
    )
}

export default HeaderLogo

