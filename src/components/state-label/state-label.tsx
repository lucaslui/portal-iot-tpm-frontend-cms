import React from 'react'

import styles from './state-label.module.scss'
import { ArticleState } from '../../models/article'
import articleTranslations from '../../i18n/article'

type CustomLabelProps = {
    state: ArticleState
}

const StateLabel: React.FC<CustomLabelProps> = ({ state }) => {
    return (
        <label className={styles.state_label} data-status={state}>
            {articleTranslations.pt.state[state]}
        </label>
    )
}

export default StateLabel