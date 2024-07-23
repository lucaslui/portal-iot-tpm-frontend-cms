import React from 'react'
import { Link } from 'react-router-dom'

import styles from './link.module.scss'

type Props = {
    url: string
}

const CustomLink: React.FC<Props> = (props: Props) => {
    return (
        <Link to={props.url} target={"_blank"} className={styles.link}>
            <i className="fas fa-link" />
            <span>Link</span>
        </Link>
    )
}

export default CustomLink