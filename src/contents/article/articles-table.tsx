import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './articles-table.module.scss'

import { ArticlesPaginatedModel, loadArticles } from '../../services/article-service'
import { ArticleModel } from '../../models/article'
import { CustomButton } from '../../components'
import { getShortStringDateFormat } from '../../utils/date'
import articleTranslations from '../../i18n/article'
import ArticleCell from '../../components/article-cell/article-cell'
import CustomLabel from '../../components/custom-label/custom-label'
import InputSearch from '../../components/input-search/search'
import FilterWrapper from '../../components/filter-by-type/filter-wrapper'

const ArticlesTable: React.FC = () => {
    const [data, setData] = useState<ArticlesPaginatedModel>()
    const [filters, setFilters] = useState({ 
        page: 1, 
        limit: 7, 
        search: '',
        type: '',
        state: '' 
    })

    const navigate = useNavigate();

    useEffect((): void => {
        fetchData()
            .then((data) => setData(data))
            .catch((error) => console.log(error))
    }, [filters])

    const fetchData = async (): Promise<ArticlesPaginatedModel> => {
        return await loadArticles(filters)
    }

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, search: event.target.value })
    }

    const handleFilter = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [event.target.name]: event.target.value })
    }

    const handleRowOnClick = (articleId: string | undefined) => {
        if (articleId) {
            navigate(`/articles/form/${articleId}`);
        }
    }

    return (
        <div className={styles.articles_table}>
            <header>
                <div className={styles.filters}>
                    <InputSearch value={filters.search} onChange={handleSearch} />
                    <FilterWrapper name="type" value={filters.type} onChange={handleFilter}>
                        <option value="" disabled defaultValue="">Filtrar por tipo</option>
                        <option value="">Todos</option>
                        <option value="concepts">Conceitos</option>
                        <option value="tutorials">Tutoriais</option>
                        <option value="projects">Projetos</option>
                        <option value="news">Notícias</option>
                    </FilterWrapper>
                    <FilterWrapper name="state" value={filters.state} onChange={handleFilter}>
                        <option value="" disabled defaultValue="">Filtrar por Estado</option>
                        <option value="">Todos</option>
                        <option value="draft">Rascunhos</option>
                        <option value="published">Publicados</option>
                        <option value="deleted">Excluídos</option>
                    </FilterWrapper>
                </div>
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
                    {data?.articles.map((article: ArticleModel) => (
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
                <span>Mostrando {data?.articles.length} de {data?.totalItems} resultados</span>
                <div>
                    <button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1}><i className="fas fa-chevron-left" /></button>
                    <span>{filters.page} de {data?.totalPages}</span>
                    <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={filters.page === data?.totalPages}><i className="fas fa-chevron-right" /></button>
                </div>
            </footer>
        </div>
    )
}

export default ArticlesTable
