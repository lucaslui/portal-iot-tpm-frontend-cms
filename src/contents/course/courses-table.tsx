import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './courses-table.module.scss'

import { CustomButton } from '../../components'
import { getShortStringDateFormat } from '../../utils/date'
import InputSearch from '../../components/input-search/search'
import FilterWrapper from '../../components/filter-by-type/filter-wrapper'
import { loadCourses } from '../../services/course-service'
import { CourseModel } from '../../models/course'
import { PaginationModel } from '../../models/shared/pagination'
import Loading from '../../components/loading/loading'
import CustomLink from '../../components/link/link'
import CompostEntityCell from '../../components/compost-entity-cell/compost-entity-cell'

const CoursesTable: React.FC = () => {
    const [data, setData] = useState<PaginationModel<CourseModel>>()

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

    const fetchData = async (): Promise<PaginationModel<CourseModel>> => {
        return await loadCourses(filters)
    }

    const handleFilter = async (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFilters({ ...filters, [event.target.name]: event.target.value })
    }

    const handleRowOnClick = (courseId: string | undefined) => {
        if (courseId) {
            navigate(`/courses/form/${courseId}`);
        }
    }

    if (!data) {
        return <Loading />
    }

    return (
        <div className={styles.courses_table}>
            <header>
                <div className={styles.filters}>
                    <InputSearch value={filters.search} onChange={handleFilter} />
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
                <Link to={"/courses/form"}> <CustomButton> Adicionar </CustomButton></Link>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Curso</th>
                        <th>Tipo</th>
                        <th>Período de Inscrição</th>
                        <th>Url de Inscrição</th>
                        <th>Atualizado em</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map(course => (
                        <tr key={course.id} onClick={() => handleRowOnClick(course.id)}>
                            <td>
                                <CompostEntityCell
                                    imageUrl={course.imageUrl}
                                    title={course.title}
                                    description={course.description}
                                />
                            </td>
                            <td>{course.type}</td>
                            <td>{getShortStringDateFormat(course.registrationPeriod.startDate)} à {getShortStringDateFormat(course.registrationPeriod.endDate)}</td>
                            <td>
                                <CustomLink url={course.landingPageUrl} />
                            </td>
                            <td>{getShortStringDateFormat(course.updatedAt)}</td>
                            <td>{getShortStringDateFormat(course.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                <span>Mostrando {data?.data?.length} de {data?.totalItems} resultados</span>
                <div>
                    <button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1}><i className="fas fa-chevron-left" /></button>
                    <span>{filters.page} de {data?.totalPages}</span>
                    <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={filters.page === data?.totalPages}><i className="fas fa-chevron-right" /></button>
                </div>
            </footer>
        </div>


    )
}

export default CoursesTable
