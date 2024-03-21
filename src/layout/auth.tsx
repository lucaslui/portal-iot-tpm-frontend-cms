import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './auth.module.scss'

import { Footer, Logo, ParticlesBackground } from '../components'

const AuthLayout: React.FC = () => {
    return (
        <div className={styles.authentication}>
            <ParticlesBackground />
            <div className={styles.container}>
                <Logo />
                <hr/>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AuthLayout