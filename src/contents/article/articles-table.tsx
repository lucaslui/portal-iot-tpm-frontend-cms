import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './articles-table.module.scss'

import { loadArticles } from '../../services/article-service'
import { ArticleModel } from '../../models/article'

const ArticlesTable: React.FC = () => {
    const [articles, setArticles] = useState<ArticleModel[]>([])

    useEffect((): void => {
        fetchData()
            .then((articles) => setArticles(articles))
            .catch((error) => console.log(error))
    }, [])

    const fetchData = async (): Promise<ArticleModel[]> => {
        const data = await loadArticles()
        return data.articles
    }

    return (
        <div className={styles.articles_table}>
            <header>
                <div className={styles.search}>
                    <input type="text" placeholder="Pesquisar" />
                    <button><i className="fas fa-search" /></button>
                </div>
                <Link to={"/articles/form"}> Adicionar </Link>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {articles?.map((article: ArticleModel) => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.description}</td>
                            <td>{article.createdAt}</td>
                            <td className={styles.actions}>
                                <Link to={`/articles/form/${article.id}`}> <i className="fas fa-edit" /> </Link>
                                <button><i className="fas fa-trash" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                <button><i className="fas fa-chevron-left" /></button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button><i className="fas fa-chevron-right" /></button>
            </footer>
        </div>
    )
}

export default ArticlesTable
