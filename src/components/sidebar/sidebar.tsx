import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './sidebar.module.scss'

type NavbarItem = {
    name: string
    path: string
    icon?: any
    children?: NavbarItem[]
}

const navbarItems = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        icon: <i className="fas fa-user" />
    },
    {
        name: 'Controle de Artigos',
        path: 'articles',
        icon: <i className="fas fa-sticky-note" />
    },
    {
        name: 'Controle de Categorias',
        path: 'categories',
        icon: <i className="fas fa-stream" />,
    },
    {
        name: 'Configuração de Conta',
        path: 'settings',
        icon: <i className="fas fa-cog" />,
        children: [
            { name: 'Adicionar', path: 'add-article' },
            { name: 'Editar', path: 'edit-article' },
            { name: 'Listar', path: 'load-articles' },
            { name: 'Deletar', path: 'delete-article' }
        ]
    }
]


type SidebarProps = {
    sidebarOpened?: boolean
    toggleSidebar?: any
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
    return (
        <div className={styles.sidebar} data-status={props.sidebarOpened ? 'open' : 'closed'}>
            <button className={styles.toggle} onClick={props.toggleSidebar}>
                <i className="fas fa-angle-double-left" />
            </button>
            <nav className={styles.menu}>
                {navbarItems.map((item: NavbarItem, index: number) => <SubMenu item={item} key={index} />)}
            </nav>
        </div >
    )
}

export default Sidebar

type SubMenuProps = {
    item: NavbarItem
}

const SubMenu: React.FC<SubMenuProps> = (props: SubMenuProps) => {
    const [children, setChildren] = useState(false)

    const showchildren = (): void => setChildren(!children)

    return (
        <>
            <Link
                className={styles.item}
                to={props.item.path}
                onClick={props.item.children && showchildren}>
                <div className={styles.label}>
                    {props.item.icon}
                    <span>{props.item.name}</span>
                </div>
                <div>
                    {props.item.children && children
                        ? <i className="fas fa-sort-up" />
                        : props.item.children ? <i className="fas fa-sort-down" /> : null}
                </div>
            </Link>
            {
                children &&
                props.item.children?.map((item: any, index: number) => {
                    return (
                        <Link className={styles.subitem} to={`${item.path}`} key={index}>
                            <span>{item.name}</span>
                        </Link>
                    )
                })
            }
        </>
    )
}

