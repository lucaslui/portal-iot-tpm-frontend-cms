import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

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
        icon: <i className="fas fa-tachometer-alt" />
    },
    {
        name: 'Lista de Artigos',
        path: 'articles',
        icon: <i className="fas fa-newspaper" />
    },
    {
        name: 'Lista de Cursos',
        path: 'courses',
        icon: <i className="fas fa-chalkboard-teacher" />
    },
    {
        name: 'Lista de Categorias',
        path: 'categories',
        icon: <i className="fas fa-list" />
    },
    {
        name: 'Configuração',
        path: 'settings',
        icon: <i className="fas fa-cogs" />,
        children: [
            { name: 'Profile', path: 'profile' },
            { name: 'Password', path: 'password' },
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

            {props.item.children
                ? <div className={styles.item} onClick={showchildren}>
                    <div className={styles.label}>
                        {props.item.icon}
                        <span>{props.item.name}</span>
                    </div>
                    <div>
                        {children ? <i className="fas fa-sort-up" /> : <i className="fas fa-sort-down" />}
                    </div>
                </div>
                : <NavLink
                    className={({ isActive }) => isActive ? `${styles.item} ${styles.active}` : styles.item}
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
                </NavLink>
            }
            {
                children &&
                props.item.children?.map((item: any, index: number) => {
                    return (
                        <NavLink className={styles.subitem} to={`${props.item.path}/${item.path}`} key={index}>
                            <span>{item.name}</span>
                        </NavLink>
                    )
                })
            }
        </>
    )
}

