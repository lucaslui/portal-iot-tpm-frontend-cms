import React, { useEffect, useState } from 'react'
import axios from 'axios'

import styles from './add-article.module.scss'

import { PageTitle, InputGroup, TextAreaGroup, Button, FormStatus, SelectTreeGroup, SelectGroup, HtmlEditorGroup } from '../../components'

const AddArticle: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: false
  })

  const [errors, setErrors] = useState({
    titleError: '',
    descriptionError: '',
    contentError: '',
    imageUrlError: '',
    mainError: '',
    successMessage: ''
  })

  const [article, setArticle] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    type: '',
    categoryId: ''
  })

  const [categories, setCategories] = useState([{
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    categoryParentId: '',
    children: []
  }])

  const [selectState, setSelectState] = useState({
    selectedOption: null
  })

  useEffect((): void => {
    fetchData()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error))
  }, [])

  const fetchData = async (): Promise<any> => {
    const result = await axios('https://espaco-de-conhecimento-backend.herokuapp.com/api/categories/tree')
    return result.data
  }

  const mapShortToLong = new Map([
    ['id', 'value'],
    ['name', 'label'],
    ['children', 'children']
  ])

  const refitKeys = (o): any => {
    if (o === null || typeof o !== 'object') {
      return o
    }
    if (Array.isArray(o)) {
      return o.map(refitKeys)
    }
    const build = {}
    for (const key in o) {
      const destKey = mapShortToLong.get(key) || key
      let value = o[key]
      if (typeof value === 'object') {
        value = refitKeys(value)
      }
      build[destKey] = value
    }
    return build
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setArticle({ ...article, [event.target.name]: event.target.value })
  }

  const handleChangeTextArea = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    setArticle({ ...article, [event.target.name]: event.target.value })
  }

  const handleSelectChange = (selectedOption): void => {
    setSelectState({ selectedOption })
    setArticle(oldState => ({ ...oldState, type: selectedOption.value }))
  }

  const handleSelectTreeChange = (currentNode, selectedNodes): void => {
    setArticle(oldState => ({ ...oldState, categoryId: selectedNodes[0].value }))
  }

  const handleEditorChange = (content): void => {
    setArticle(oldState => ({ ...oldState, content }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    console.log(article)
    try {
      if (!state.isLoading && !state.isFormInvalid) {
        setState(oldState => ({ ...oldState, isLoading: true }))
        await axios.request({
          url: 'https://espaco-de-conhecimento-backend.herokuapp.com/api/articles',
          method: 'POST',
          data: {
            title: article.title,
            description: article.description,
            content: article.content,
            imageUrl: article.imageUrl,
            categoryId: article.categoryId
          },
          headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2E1MzdhYTY1YTY5MzJkN2Y3Y2YwZSIsImlhdCI6MTYxODg3NDk4OH0.mmRlN-Qb3L970JbdWyoZ3Hg3i4m_ynVgIYxXtYz3Src' }
        })
        setState(oldState => ({ ...oldState, isLoading: false }))
        setErrors(oldState => ({ ...oldState, successMessage: 'Artigo adicionado!' }))
      }
    } catch (error) {
      setState({ ...state, isLoading: false })
      setErrors({ ...errors, mainError: error.message })
    }
  }

  return (
    <>
      <PageTitle title='Adicionar Artigo' />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <InputGroup
            mr={true}
            onChange={handleChange}
            title={errors.titleError}
            type="text"
            name="title"
            span="Título do Artigo (máx: 100 caracteres):"
            placeholder="Digite o título do artigo"
          />
          <InputGroup
            onChange={handleChange}
            title={errors.imageUrlError}
            type="text"
            name="imageUrl"
            span="Imagem de Capa (.jpg/.jpeg/.png):"
            placeholder="Digite o link de uma imagem para utilizar como capa para o artigo"
          />
        </div>
        <div className='testee'>
          <div className='halfsize pr'>
            <SelectGroup
              label="Tipo do Artigo:"
              placeholder='Seleciona o tipo do artigo...'
              value={selectState.selectedOption}
              onChange={handleSelectChange}
              options={[
                { value: 'new', label: 'Notícia' },
                { value: 'tutorial', label: 'Tutorial' },
                { value: 'project', label: 'Projeto' }
              ]}
            />
          </div>
          <div className='halfsize'>
            <SelectTreeGroup
              label="Categoria do Artigo:"
              mode="radioSelect"
              texts={{ placeholder: 'Procurar a categoria...', noMatches: 'Nenhuma categoria foi encontrada.' }}
              data={refitKeys(categories)}
              onChange={handleSelectTreeChange}
            />
          </div>
        </div>
        <TextAreaGroup
          className={styles.bigInput}
          onChange={handleChangeTextArea}
          title={errors.imageUrlError}
          name="description"
          span="Resumo do Artigo (máx: 200 caracteres):"
          placeholder="Digite um resumo do artigo"
        />
        <HtmlEditorGroup
          label="Conteúdo:"
          onEditorChange={handleEditorChange}
        />
        <div className={styles.row}>
          <Button disabled={false} type="submit"> Adicionar </Button>
          <FormStatus isLoading={state.isLoading} mainError={errors.mainError} successMessage={errors.successMessage}/>
        </div>
      </form>
    </>
  )
}

export default AddArticle
