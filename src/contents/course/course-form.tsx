import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './course-form.module.scss'

import AccountContext from '../../contexts/account-context'
import { PageTitle, CustomButton, FormStatus, TextArea, Input } from '../../components'
import { addCourse, EditCourseModel, updateCourse } from '../../services/course-service'
import InputImage from '../../components/input-image/input-image'
import NoImage from '../../assets/imgs/no-image.svg'
import Select from '../../components/select/select'
import { CourseModel } from '../../models/course'
import InputDate from '../../components/input-date/input-date'

const AddCourse: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)

    const params = useParams();

    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: false
    })

    const [errors, setErrors] = useState({
        mainError: '',
        successMessage: ''
    })

    const [course, setCourse] = useState<EditCourseModel>({
        title: '',
        description: '',
        observation: '',
        type: '',
        imageUrl: '',
        imageBinary: null,
        landingPageUrl: '',
        registrationPeriod: {
            startDate: '',
            endDate: ''
        },
        classPeriod: {
            startDate: '',
            endDate: ''
        },
        classSchedules: {
            weekDay: '',
            endTime: '',
            startTime: ''
        }
    })

    useEffect(() => {
        if (params.courseId) {
            fetchCourseById()
                .then(data => setCourse({
                    title: data.title,
                    description: data.description,
                    observation: data.observation,
                    type: data.type,
                    imageUrl: data.imageUrl,
                    imageBinary: null,
                    landingPageUrl: data.landingPageUrl,
                    registrationPeriod: data.registrationPeriod,
                    classPeriod: data.classPeriod,
                    classSchedules: data.classSchedules
                }))
                .catch((error) => console.log(error))
        }
    }, [params.courseId])

    const fetchCourseById = async (): Promise<CourseModel> => {
        const result = await axios(`${import.meta.env.VITE_API_URL}/api/courses/${params.courseId}`)
        return result.data
    }

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

    const titleFieldError = checkValidation('title', course)
    const descriptionFieldError = checkValidation('description', course)
    const typeFieldError = checkValidation('type', course)
    const stateFieldError = checkValidation('state', course)
    const readTimeFieldError = checkValidation('readTime', course)

    const isFormInvalid = !!titleFieldError || !!descriptionFieldError || !!typeFieldError || !!stateFieldError || !!readTimeFieldError

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        console.log('event:', event)
        setCourse({ ...course, [event.target.name]: event.target.value })
    }

    const handleRegistrationPeriod = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCourse({ ...course, registrationPeriod: { ...course.registrationPeriod, [event.target.name]: event.target.value + 'T00:00:00.000Z' } })
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files?.[0]) {
            setCourse({
                ...course,
                imageUrl: URL.createObjectURL(event.target.files?.[0]),
                [event.target.name]: event.target.files?.[0]
            })
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (!state.isLoading && !state.isFormInvalid) {
                setErrors(oldState => ({ ...oldState, mainError: '', successMessage: '' }))
                setState(oldState => ({ ...oldState, isLoading: true }))
                const token = getCurrentAccount()?.accessToken
                if (params.courseId) {
                    const addCourse = { ...course }
                    await updateCourse(params.courseId, addCourse, token)
                    setErrors(oldState => ({ ...oldState, successMessage: 'Artigo atualizado!' }))
                } else {
                    await addCourse(course, token)
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
        <div className={styles.course_form}>
            <PageTitle title='Adicionar/Editar Oferencimento de Cursos' />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={`${styles.col} ${styles.full}`}>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="title">Título: <span>(máx: 100 caracteres)</span></label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder='Digite o título do artigo...'
                                    title={titleFieldError}
                                    value={course.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="type">Tipo:</label>
                                <Select
                                    className={styles.type}
                                    id="type"
                                    name="type"
                                    title={typeFieldError}
                                    value={course.type}
                                    onChange={handleChange}>
                                    <option value="" disabled selected hidden>Selecione o tipo do artigo...</option>
                                    <option value='Curso de Extensão da Unicamp'>Curso de Extensão da Unicamp</option>
                                </Select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="landingPageUrl">Link da página de inscrição:</label>
                                <Input
                                    type="text"
                                    id="landingPageUrl"
                                    name="landingPageUrl"
                                    placeholder='Digite o link da página de inscrição...'
                                    value={course.landingPageUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="observation">Observação:</label>
                                <Input
                                    type="text"
                                    id="observation"
                                    name="observation"
                                    placeholder='Digite a observação do artigo...'
                                    value={course.observation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <InputImage
                            name='imageBinary'
                            imagePreview={course.imageUrl}
                            imageDefault={NoImage}
                            onChange={handleImageChange}
                            label='Imagem de capa'
                            placeholder='Insira a imagem de capa do artigo...' />
                        <div className={styles.row}>
                            <fieldset className={styles.fieldset}>
                                <legend>Período de Inscrição</legend>
                                <div className={styles.group}>
                                    <label htmlFor="registration-period-start-date">Data Inicial:</label>
                                    <InputDate
                                        type="date"
                                        id="registration-period-start-date"
                                        name="startDate"
                                        value={course.registrationPeriod.startDate.split('T')[0]}
                                        onChange={handleRegistrationPeriod}
                                    />
                                </div>
                                <div className={styles.group}>
                                    <label htmlFor="registration-period-end-date">Data Final:</label>
                                    <InputDate
                                        type="date"
                                        id="registration-period-end-date"
                                        name="endDate"
                                        value={course.registrationPeriod.endDate.split('T')[0]}
                                        onChange={handleRegistrationPeriod}
                                    />
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={`${styles.group} ${styles.full_width}`}>
                        <label htmlFor="description">Descrição: <span>(máx: 200 caracteres)</span></label>
                        <TextArea
                            id="description"
                            name="description"
                            placeholder='Digite o resumo do artigo...'
                            title={descriptionFieldError}
                            value={course.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* <div className={styles.row_editor}>
                    <label>Conteúdo:</label>
                    <RichTextEditor
                        value={course.content}
                        onChangeValue={handleEditorChange}
                    />
                </div> */}
                <div className={styles.flex_end}>
                    <FormStatus isLoading={state.isLoading} mainError={errors.mainError} successMessage={errors.successMessage} />
                    <CustomButton disabled={isFormInvalid} type="submit"> {params.courseId ? 'Salvar' : 'Adicionar'} </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default AddCourse
