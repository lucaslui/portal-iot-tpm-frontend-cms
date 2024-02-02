import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './navbar.module.scss'

const NavBar: React.FC = () => {
  return (
      <nav className={styles.navbar}>
        <NavLink to='/home' className={(navData) => (navData.isActive ? 'active' : '')}>
          <i className="fas fa-home" />
          <span> Início </span>
        </NavLink>
        <NavLink to='/news' className={(navData) => (navData.isActive ? 'active' : '')}>
          <i className="fas fa-bookmark" />
          <span> Notícias </span>
        </NavLink>
        <NavLink to='/tutorials/categories' className={(navData) => (navData.isActive ? 'active' : '')}>
          <i className="fas fa-book" />
          <span> Tutoriais </span>
        </NavLink>
        <NavLink to='/projects' className={(navData) => (navData.isActive ? 'active' : '')}>
          <i className="fas fa-chart-bar" />
          <span> Projetos </span>
        </NavLink>
      </nav>
  )
}

export default NavBar
