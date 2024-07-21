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

const CoursesTable: React.FC = () => {
    const [data, setData] = useState<PaginationModel<CourseModel>>({
        data: [],
        count: 0,
        page: 1,
        totalPages: 1,
        totalItems: 0
    })

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
                        <th>Estado</th>
                        <th>Temp. Leitura</th>
                        <th>Atualizado em</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((course: CourseModel) => (
                        <tr key={course.id} onClick={() => handleRowOnClick(course.id)}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.type}</td>
                            <td>{course.landingPageUrl}</td>
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
