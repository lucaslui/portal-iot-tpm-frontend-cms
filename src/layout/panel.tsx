import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './panel.module.scss'

import { ParticlesBackground, Header, Sidebar, Footer } from '../components'

const PanelLayout: React.FC = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false)

    const toggleSidebar = (): void => setSidebarOpened(!sidebarOpened)

    const navbarItems = [
        {
            name: 'Dashboard',
            path: 'dashboard',
            icon: <i className="fas fa-user" />
        },
        {
            name: 'Controle de Artigos',
            path: 'article-management',
            icon: <i className="fas fa-sticky-note" />,
            children: [
                { name: 'Adicionar', path: 'add-article' },
                { name: 'Editar', path: 'edit-article' },
                { name: 'Listar', path: 'load-articles' },
                { name: 'Deletar', path: 'delete-article' }
            ]
        },
        {
            name: 'Controle de Categorias',
            path: 'category-management',
            icon: <i className="fas fa-stream" />,
            children: [
                { name: 'Adicionar', path: 'add-category' },
                { name: 'Editar', path: 'edit-category' },
                { name: 'Listar', path: 'load-categories' },
                { name: 'Deletar', path: 'delete-category' }
            ]
        },
        {
            name: 'Configuração de Conta',
            path: 'account-settings',
            icon: <i className="fas fa-cog" />
        }
    ]

    return (
        <div className={styles.panel}>
            <ParticlesBackground />
            <Header />
            <div className={styles.content}>
                <Sidebar items={navbarItems} toggleSidebar={toggleSidebar} sidebarOpened={sidebarOpened} />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default PanelLayout