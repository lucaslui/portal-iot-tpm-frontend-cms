import React from 'react'

import styles from './filter-wrapper.module.scss'

type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

const FilterWrapper: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props
    return (
        <div className={styles.filter_wrapper}>
            <i className="fas fa-filter"></i>
            <select {...rest}>
                {children}
            </select>
        </div>
    )
}

export default FilterWrapper