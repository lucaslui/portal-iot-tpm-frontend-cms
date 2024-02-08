import React from 'react'

import styles from './delete-article.module.scss'

import { PageTitle } from '../../components'

const DeleteArticle: React.FC = () => {
  return (
    <>
      <PageTitle title='Adicionar Artigo' />
      <div className={styles.deleteArticle}>
      </div>
    </>

  )
}

export default DeleteArticle
