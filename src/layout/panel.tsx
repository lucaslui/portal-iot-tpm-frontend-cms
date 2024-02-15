import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './panel.module.scss'

import { ParticlesBackground, Header, Sidebar, Footer } from '../components'

const PanelLayout: React.FC = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false)

    const toggleSidebar = (): void => setSidebarOpened(!sidebarOpened)

    return (
        <div className={styles.panel}>
            <ParticlesBackground />
            <Header />
            <div className={styles.content}>
                <Sidebar toggleSidebar={toggleSidebar} sidebarOpened={sidebarOpened} />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default PanelLayout