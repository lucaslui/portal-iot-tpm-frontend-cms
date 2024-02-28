import React from 'react';

import styles from './article-cell.module.scss';

import { ArticleModel } from '../../models/article';

type Props = {
    article: ArticleModel
}

const ArticleCell: React.FC<Props> = ({ article }: Props) => {
    return (
        <div className={styles.article_cell}>
            <img src={article.imageUrl} alt="imagem de capa"></img>
            <div className={styles.texts}>
                <span>{article.title}</span>
                <p>{article.description}</p>
            </div>
        </div>
    );
}

export default ArticleCell;