import React from 'react'

import styles from './input-date.module.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputDate: React.FC<Props> = (props: Props) => {
    return (
        <input
            {...props}
            className={styles.input_date}
        />
    )
}

export default InputDate
