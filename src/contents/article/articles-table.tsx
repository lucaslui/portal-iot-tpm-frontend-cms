import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './articles-table.module.scss'

import { ArticlesPaginatedModel, loadArticles } from '../../services/article-service'
import { ArticleModel } from '../../models/article'
import { getDateFormat } from '../../utils/date'

const ArticlesTable: React.FC = () => {
    const [state, setStates] = useState<ArticlesPaginatedModel>()
    const [page, setPage] = useState(1)

    const navigate = useNavigate();

    useEffect((): void => {
        fetchData()
            .then((data) => setStates(data))
            .catch((error) => console.log(error))
    }, [page])

    const fetchData = async (): Promise<ArticlesPaginatedModel> => {
        const data = await loadArticles({ page, limit: 8 })
        return data
    }

    const handleRowOnClick = (articleId: string | undefined) => {
        if (articleId) {
            navigate(`/articles/form/${articleId}`);
        }
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
                        <th>Artigo</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Temp. Leitura</th>
                        <th>Atualizado em</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {state?.articles.map((article: ArticleModel) => (
                        <tr key={article.id} onClick={() => handleRowOnClick(article.id)}>
                            <td>
                                <div className={styles.title}>
                                    <img src={article.imageUrl} alt="imagem de capa"></img>
                                    <div className={styles.texts}>
                                        <span>{article.title}</span>
                                        <p>{article.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{article.type}</td>
                            <td>{article.state}</td>
                            <td>{article.readTime}</td>
                            <td>{getDateFormat(article.updatedAt)}</td>
                            <td>{getDateFormat(article.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                <span>Mostrando {state?.articles.length} de {state?.totalItems} resultados</span>
                <div>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}><i className="fas fa-chevron-left" /></button>
                    <span>{page} de {state?.totalPages}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page === state?.totalPages}><i className="fas fa-chevron-right" /></button>
                </div>
            </footer>
        </div>
    )
}

export default ArticlesTable
