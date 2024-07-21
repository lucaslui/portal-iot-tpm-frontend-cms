import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './auth.module.scss'

import { Footer, ParticlesBackground, VerticalLogo } from '../components'

const AuthLayout: React.FC = () => {
    return (
        <div className={styles.authentication}>
            <ParticlesBackground />
            <div className={styles.container}>
                <VerticalLogo />
                <hr/>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AuthLayout