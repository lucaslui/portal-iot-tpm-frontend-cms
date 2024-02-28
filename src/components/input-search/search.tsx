import React from 'react'

import styles from './search.module.scss'

type Props = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputSearch: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.search}>
            <i className="fas fa-search" />
            <input type="text" placeholder="Pesquisar" value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default InputSearch