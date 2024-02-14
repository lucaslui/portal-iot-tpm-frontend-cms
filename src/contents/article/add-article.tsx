import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import styles from './add-article.module.scss'

import AccountContext from '../../contexts/account-context'

import { PageTitle, CustomButton, FormStatus, SelectTreeGroup } from '../../components'
import RichTextEditor from '../../components/rich-text-editor/rich-text-editor'
import { AddArticleParams, addArticle } from '../../services/article-service'
import InputImage from '../../components/input-image/input-image'

import NoImage from '../../assets/imgs/no-image.svg'

const AddArticle: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)

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

    const [article, setArticle] = useState<AddArticleParams>({
        title: '',
        description: '',
        content: '',
        imageBinary: null,
        type: '',
        categoryIds: [] as string[]
    })

    useEffect(() => {
        console.log('article:', article)
    }, [article])

    const [categories, setCategories] = useState([{
        id: '',
        name: '',
        description: '',
        imageUrl: '',
        categoryParentId: '',
        children: []
    }])

    useEffect((): void => {
        fetchData()
            .then((data) => setCategories(data))
            .catch((error) => console.log(error))
    }, [])

    const fetchData = async (): Promise<any> => {
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
        categoryIds.forEach(id => { values[id] = true })
        return values
    }

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setArticle({ ...article, [event.target.name]: event.target.value })
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setArticle({ ...article, [event.target.name]: event.target.files?.[0] })
    }

    const handleChangeTextArea = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
        setArticle({ ...article, [event.target.name]: event.target.value })
    }

    const handleSelectChange = (selectedOption: any): void => {
        setArticle(oldState => ({ ...oldState, type: selectedOption.target.value }))
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
                setState(oldState => ({ ...oldState, isLoading: true }))
                const token = getCurrentAccount()?.accessToken
                await addArticle(article, token)
                setState(oldState => ({ ...oldState, isLoading: false }))
                setErrors(oldState => ({ ...oldState, successMessage: 'Artigo adicionado!' }))
            }
        } catch (error: any) {
            setState({ ...state, isLoading: false })
            setErrors({ ...errors, mainError: error.message })
        }
    }

    return (
        <div className={styles.add_article}>
            <PageTitle title='Adicionar Artigo' />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.row}>
                            <div className={`${styles.group} ${styles.full_width}`}>
                                <label htmlFor="title">Título do Artigo <span>(máx: 100 caracteres)</span></label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder='Digite o título do artigo...'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={`${styles.group}`}>
                                <label htmlFor="type">Tipo de Artigo:</label>
                                <select className={styles.type} id="type" name="type" onChange={handleSelectChange}>
                                    <option value="" disabled selected hidden>Selecione o tipo do artigo...</option>
                                    <option value='concepts'>Artigo</option>
                                    <option value='news'>Notícia</option>
                                    <option value='tutorials'>Tutorial</option>
                                    <option value='projects'>Projeto</option>
                                </select>
                            </div>
                            <div className={`${styles.group} ${styles.full_width}`}>
                                <label htmlFor="type">Categoria de Artigo</label>
                                <SelectTreeGroup
                                    nodes={refitNodes(categories)}
                                    value={buildValues(article.categoryIds)}
                                    onChange={handleSelectTreeChange}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={`${styles.group} ${styles.full_width}`}>
                                <label htmlFor="description">Resumo do Artigo <span>(máx: 200 caracteres)</span></label>
                                <textarea
                                    className={styles.bigInput}
                                    id="description"
                                    name="description"
                                    placeholder='Digite o resumo do artigo...'
                                    onChange={handleChangeTextArea}
                                />
                            </div>
                        </div>
                    </div>
                    <InputImage
                        name='imageBinary'
                        imageFile={article.imageBinary}
                        imageDefault={NoImage}
                        onChange={handleImageChange}
                        placeholder='Insira a imagem de capa do artigo...' />
                </div>

                <div className={styles.row_editor}>
                    <label>Conteúdo do Artigo:</label>
                    <RichTextEditor
                        value={article.content}
                        onChangeValue={handleEditorChange}
                    />
                </div>
                <div className={styles.row}>
                    <CustomButton disabled={false} type="submit"> Adicionar </CustomButton>
                    <FormStatus isLoading={state.isLoading} mainError={errors.mainError} successMessage={errors.successMessage} />
                </div>
            </form>
        </div>
    )
}

export default AddArticle
