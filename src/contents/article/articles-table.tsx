import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './articles-table.module.scss'

import { ArticlesPaginatedModel, loadArticles } from '../../services/article-service'
import { ArticleModel } from '../../models/article'
import { CustomButton, Input } from '../../components'
import { getShortStringDateFormat } from '../../utils/date'
import articleTranslations from '../../i18n/article'
import ArticleCell from '../../components/article-cell/article-cell'
import CustomLabel from '../../components/custom-label/custom-label'
import InputSearch from '../../components/input-search/search'

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
        return await loadArticles({ page, limit: 8 })
    }

    const handleRowOnClick = (articleId: string | undefined) => {
        if (articleId) {
            navigate(`/articles/form/${articleId}`);
        }
    }

    return (
        <div className={styles.articles_table}>
            <header>
                <InputSearch />
                <Link to={"/articles/form"}> <CustomButton> Adicionar </CustomButton></Link>
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
                                <ArticleCell article={article} />
                            </td>
                            <td><CustomLabel className={styles.capitalize} text={article.type ? articleTranslations.pt.type[article.type] : ''} /></td>
                            <td><CustomLabel className={styles.capitalize} text={article.state ? articleTranslations.pt.state[article.state] : ''} /></td>
                            <td>{article.readTime} minutos </td>
                            <td>{getShortStringDateFormat(article.updatedAt)}</td>
                            <td>{getShortStringDateFormat(article.createdAt)}</td>
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
