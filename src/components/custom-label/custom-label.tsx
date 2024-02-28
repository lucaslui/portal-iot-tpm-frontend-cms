import React from 'react'

import styles from './custom-label.module.scss'

interface CustomLabelProps {
    text: string
    className?: string
}

const CustomLabel: React.FC<CustomLabelProps> = ({ text, className }) => {
    return (
        <label className={`${styles.custom_label} ${className}`}>
            {text}
        </label>
    )
}

export default CustomLabel