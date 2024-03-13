import React, { InputHTMLAttributes } from 'react'

import styles from './search.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement>


const InputSearch: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.search}>
            <i className="fas fa-search" />
            <input name="search" type="text" placeholder="Pesquisar por texto..." value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default InputSearch