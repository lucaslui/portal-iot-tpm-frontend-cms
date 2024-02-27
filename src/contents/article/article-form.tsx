import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import styles from './article-form.module.scss'

import AccountContext from '../../contexts/account-context'
import { PageTitle, CustomButton, FormStatus, SelectTreeGroup, TextArea, Input } from '../../components'
import RichTextEditor from '../../components/rich-text-editor/rich-text-editor'
import { addArticle, updateArticle } from '../../services/article-service'
import InputImage from '../../components/input-image/input-image'
import NoImage from '../../assets/imgs/no-image.svg'
import Select from '../../components/select/select'

const AddArticle: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)

    const params = useParams();

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
        type: '',
        state: '',
        readTime: 5,
        content: '',
        imageUrl: '',
        imageBinary: null,
        categoryIds: [] as string[]
    })

    useEffect(() => {
        if (params.articleId) {
            fetchArticleById()
                .then((data) => setArticle({
                    title: data.title,
                    description: data.description,
                    type: data.type,
                    state: data.state,
                    readTime: data.readTime,
                    content: data.content,
                    imageUrl: data.imageUrl,
                    imageBinary: null,
                    categoryIds: data.categories?.map((category: any) => category.id)
                }))
                .catch((error) => console.log(error))
        }
    }, [params.articleId])

    const fetchArticleById = async (): Promise<any> => {
        const result = await axios(`${import.meta.env.VITE_API_URL}/api/articles/${params.articleId}`)
        return result.data
    }

    // useEffect(() => {
    //     console.log('article:', article)
    // }, [article])

    const [categories, setCategories] = useState([{
        id: '',
        name: '',
        description: '',
        imageUrl: '',
        categoryParentId: '',
        children: []
    }])

    useEffect((): void => {
        fetchCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.log(error))
    }, [])

    const checkValidation = (field: string, formData: any): string => {
        const value = formData[field]
        switch (field) {
            case 'title':
                return value ? '' : 'Campo obrigatório'
            case 'description':
                return value ? '' : 'Campo obrigatório'
            case 'type':
                return value ? '' : 'Campo obrigatório'
            case 'state':
                return value ? '' : 'Campo obrigatório'
            case 'readTime':
                return value ? '' : 'Campo obrigatório'
            default:
                return ''
        }
    }

    const titleFieldError = checkValidation('title', article)
    const descriptionFieldError = checkValidation('description', article)
    const typeFieldError = checkValidation('type', article)
    const stateFieldError = checkValidation('state', article)
    const readTimeFieldError = checkValidation('readTime', article)

    const isFormInvalid = !!titleFieldError || !!descriptionFieldError || !!typeFieldError || !!stateFieldError || !!readTimeFieldError

    const fetchCategories = async (): Promise<any> => {
        const result = await axios(`${import.meta.env.VITE_API_URL}/api/categories/tree`)
        return result.data
    }

    const mapShortToLong = new Map([
        ['id', 'key'],
        ['name', 'label'],
        ['children', 'children']
    ])

    const refitNodes = (object: any): any => {
        if (object === null || typeof object !== 'object') {
            return object
        }

        if (Array.isArray(object)) {
            return object.map(refitNodes)
        }

        const build = {} as any

        for (const node in object) {
            const destNode = mapShortToLong.get(node) || node
            let key = object[node]
            if (typeof key === 'object') {
                key = refitNodes(key)
            }
            build[destNode] = key
        }
        return build
    }

    const buildValues = (categoryIds: string[]): any => {
        const values = {} as { [categoryId: string]: boolean }
        categoryIds?.forEach(id => { values[id] = true })
        return values
    }

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setArticle({ ...article, [event.target.name]: event.target.value })
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files?.[0]) {
            setArticle({
                ...article,
                imageUrl: URL.createObjectURL(event.target.files?.[0]),
                [event.target.name]: event.target.files?.[0]
            })
        }
    }

    const handleChangeTextArea = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
        setArticle({ ...article, [event.target.name]: event.target.value })
    }

    const handleSelectChange = (event: any): void => {
        setArticle(oldState => ({ ...oldState, [event.target.name]: event.target.value }))
    }

    const handleSelectTreeChange = (event: any): void => {
        setArticle(oldState => ({ ...oldState, categoryIds: Object.keys(event.value) }))
    }

    const handleEditorChange = (content: string): void => {
        setArticle(oldState => ({ ...oldState, content }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (!state.isLoading && !state.isFormInvalid) {
                setErrors(oldState => ({ ...oldState, mainError: '', successMessage: '' }))
                setState(oldState => ({ ...oldState, isLoading: true }))
                const token = getCurrentAccount()?.accessToken
                if (params.articleId) {
                    await updateArticle(params.articleId, article, token)
                    setErrors(oldState => ({ ...oldState, successMessage: 'Artigo atualizado!' }))
                } else {
                    await addArticle(article, token)
                    setErrors(oldState => ({ ...oldState, successMessage: 'Artigo adicionado!' }))
                }
                setState(oldState => ({ ...oldState, isLoading: false }))
            }
        } catch (error: any) {
            setState({ ...state, isLoading: false })
            setErrors({ ...errors, mainError: error.message })
        }
    }

    return (
        <div className={styles.article_form}>
            <PageTitle title='Adicionar/Editar Artigo' />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={`${styles.row}`}>
                            <div className={`${styles.group} ${styles.full}`}>
                                <label htmlFor="title">Título: <span>(máx: 100 caracteres)</span></label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder='Digite o título do artigo...'
                                    title={titleFieldError}
                                    value={article.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={`${styles.row}`}>
                            <div className={`${styles.group}`}>
                                <label htmlFor="type">Tipo de conteúdo:</label>
                                <Select
                                    className={styles.type}
                                    id="type"
                                    name="type"
                                    title={typeFieldError}
                                    value={article.type}
                                    onChange={handleSelectChange}>
                                    <option value="" disabled selected hidden>Selecione o tipo do artigo...</option>
                                    <option value='concepts'>Artigo</option>
                                    <option value='news'>Notícia</option>
                                    <option value='tutorials'>Tutorial</option>
                                    <option value='projects'>Projeto</option>
                                </Select>
                            </div>
                            <div className={`${styles.group}`}>
                                <label htmlFor="state">Estado de publicação:</label>
                                <Select
                                    className={styles.type}
                                    id="state"
                                    name="state"
                                    title={stateFieldError}
                                    value={article.state}
                                    onChange={handleSelectChange}>
                                    <option value="" disabled selected hidden>Selecione o estado do artigo...</option>
                                    <option value='draft'>Rascunho</option>
                                    <option value='published'>Publicado</option>
                                    <option value='deleted'>Excluído</option>
                                </Select>
                            </div>
                            <div className={`${styles.group}`}>
                                <label htmlFor="readTime">Tempo de leitura: <span>(em minutos)</span></label>
                                <Input
                                    type="number"
                                    id="readTime"
                                    name="readTime"
                                    placeholder='Digite o tempo de leitura...'
                                    title={readTimeFieldError}
                                    value={article.readTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={`${styles.row}`}>
                            <div className={`${styles.group} ${styles.full_width}`}>
                                <label htmlFor="type">Categoria:</label>
                                <SelectTreeGroup
                                    nodes={refitNodes(categories)}
                                    value={buildValues(article.categoryIds)}
                                    onChange={handleSelectTreeChange}
                                />
                            </div>
                        </div>
                    </div>
                    <InputImage
                        name='imageBinary'
                        imagePreview={article.imageUrl}
                        imageDefault={NoImage}
                        onChange={handleImageChange}
                        label='Imagem de capa:'
                        placeholder='Insira a imagem de capa do artigo...' />
                </div>
                <div className={styles.row}>
                    <div className={`${styles.group} ${styles.full_width}`}>
                        <label htmlFor="description">Descrição: <span>(máx: 200 caracteres)</span></label>
                        <TextArea
                            id="description"
                            name="description"
                            placeholder='Digite o resumo do artigo...'
                            title={descriptionFieldError}
                            value={article.description}
                            onChange={handleChangeTextArea}
                        />
                    </div>
                </div>
                <div className={styles.row_editor}>
                    <label>Conteúdo:</label>
                    <RichTextEditor
                        value={article.content}
                        onChangeValue={handleEditorChange}
                    />
                </div>
                <div className={styles.flex_end}>
                    <FormStatus isLoading={state.isLoading} mainError={errors.mainError} successMessage={errors.successMessage} />
                    <CustomButton disabled={isFormInvalid} type="submit"> {params.articleId ? 'Salvar' : 'Adicionar'} </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default AddArticle
