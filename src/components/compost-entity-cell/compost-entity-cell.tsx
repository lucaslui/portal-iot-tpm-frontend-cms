import React from 'react';

import styles from './compost-entity-cell.module.scss';

type Props = {
    imageUrl: string
    title: string
    description: string
}

const CompostEntityCell: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.compost_entity_cell}>
            <img src={props.imageUrl} alt="imagem de capa"></img>
            <div className={styles.texts}>
                <span>{props.title}</span>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export default CompostEntityCell;