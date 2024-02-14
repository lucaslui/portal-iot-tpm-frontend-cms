import React from 'react'

import styles from './input-group.module.scss'

import Input from '../input/input'

type Props =
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { label: string }

const InputGroup: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.inputGroup}>
            <label> {props.label} </label>
            <Input {...props} />
        </div>
    )
}

export default InputGroup
