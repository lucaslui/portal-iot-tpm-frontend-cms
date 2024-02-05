import React from 'react'

import styles from './custom-button.module.scss'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const CustomButton: React.FC<Props> = (props: Props) => {
    return (
        <button className={styles.custom_button} {...props}> {props.children} </button>
    )
}

export default CustomButton
