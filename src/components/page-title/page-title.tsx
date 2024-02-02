import React from 'react'

import styles from './page-title.module.scss'

type Props = {
  title?: string
  subtitle?: string
}

const PageTitle: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.pageTitle}>
      <h1> {props.title} </h1>
      <h2> {props.subtitle} </h2>
    </div>
  )
}

export default PageTitle
