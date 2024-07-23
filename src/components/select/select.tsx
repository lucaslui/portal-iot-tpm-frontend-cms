import React from 'react'

import styles from './select.module.scss'

type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

const Select: React.FC<Props> = (props: Props) => {
    const getStatus = (): string => {
        return props.title ? '🔴' : '🟢'
    }

    const getTitle = (): string => {
        return props.title || 'Tudo certo'
    }

    return (
        <div className={styles.select_wrapper}>
            <select
                {...props}
                // data-status={props.title ? 'invalid' : 'valid'}
            >
                {props.children}
            </select>
            <span
                title={getTitle()}
                className={styles.status}>
                {/* {getStatus()} */}
            </span>
        </div>
    )
}

export default Select
