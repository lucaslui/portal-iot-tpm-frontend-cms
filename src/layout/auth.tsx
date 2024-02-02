import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './auth.module.scss'

import { Footer, ParticlesBackground } from '../components'

const AuthLayout: React.FC = () => {
    return (
        <div className={styles.auth}>
            <ParticlesBackground />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AuthLayout