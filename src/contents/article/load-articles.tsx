import React, { useEffect, useState } from 'react'

import styles from './load-articles.module.scss'

import { loadArticles } from '../../services/article-service'
import { ArticleModel } from '../../models/article'
import { PageTitle } from '../../components'

const LoadArticles: React.FC = () => {
    const [articles, setArticles] = useState<ArticleModel[]>([])

    useEffect((): void => {
        fetchData()
            .then((articles) => setArticles(articles))
            .catch((error) => console.log(error))
    }, [])

    const fetchData = async (): Promise<ArticleModel[]> => {
        const articles = await loadArticles()
        return articles
    }

    return (
        <div className={styles.load_articles}>
            <PageTitle title='Lista de Artigos' />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {articles?.map((article: ArticleModel) => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.description}</td>
                            <td>{article.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LoadArticles
