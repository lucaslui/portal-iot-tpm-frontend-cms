import React, { useEffect, useState } from 'react'

import styles from './delete-article.module.scss'

import axios from 'axios'
import { PageTitle } from '../../components'

const DeleteArticle: React.FC = () => {
  // const columns = React.useMemo(
  //   () => [
  //     { Header: 'Column 1', accessor: 'col1' },
  //     { Header: 'Column 2', accessor: 'col2' }
  //   ], []
  // )

  const columns = React.useMemo(
    () => [
      { Header: '#', accessor: 'id' },
      { Header: 'Título', accessor: 'title' },
      { Header: 'Resumo', accessor: 'description' },
      { Header: 'Conteúdo', accessor: 'content' },
      { Header: 'Imagem', accessor: 'imageUrl' },
      { Header: 'Categoria', accessor: 'categoryId' }
    ], []
  )

  const [article, setArticle] = useState([{
    id: '',
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    categoryId: ''
  }])

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow
  // } = useTable(
  //   { columns, data },
  //   useFilters,
  //   useGroupBy,
  //   useSortBy,
  //   useExpanded,
  //   usePagination)

  useEffect((): void => {
    fetchData()
      .then((data) => setArticle(data))
      .catch((error) => console.log(error))
  }, [])

  const fetchData = async (): Promise<any> => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles`)
    return result.data
  }

  return (
    <>
      <PageTitle title='Adicionar Artigo' />
      <div className={styles.deleteArticle}>
      </div>
    </>

  )
}

export default DeleteArticle
