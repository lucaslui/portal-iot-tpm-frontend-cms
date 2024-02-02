import React from 'react'

import styles from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} IoT P-Library. Todos os direitos reservados. </span>
    </footer>
  )
}

export default Footer
