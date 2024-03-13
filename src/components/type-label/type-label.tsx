import React from 'react'

import styles from './type-label.module.scss'

import { ArticleType } from '../../models/article'
import articleTranslations from '../../i18n/article'

type TypeLabelProps = {
    type: ArticleType
}

const TypeLabel: React.FC<TypeLabelProps> = ({ type }) => {
    return (
        <label className={styles.type_label} data-status={type}>
            {articleTranslations.pt.type[type]}
        </label>
    )
}

export default TypeLabel