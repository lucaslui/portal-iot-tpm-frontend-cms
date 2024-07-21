import React from 'react'

import styles from './delete-course.module.scss'

import { PageTitle } from '../../components'

const DeleteCourse: React.FC = () => {
    return (
        <div className={styles.delete_course}>
            <PageTitle title='Adicionar Curso' />
            <div className={styles.deleteArticle}>
            </div>
        </div>

    )
}

export default DeleteCourse
