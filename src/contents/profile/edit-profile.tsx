import React, { useState, useEffect, useContext } from 'react'

import styles from './edit-profile.module.scss'

import { PageTitle, InputGroup, TextAreaGroup, FormStatus, CustomButton } from '../../components'
import { loadUserProfile, updateUserProfile } from '../../services/user-service'
import AccountContext from '../../contexts/account-context'
import InputImage from '../../components/input-image/input-image'

import DefaultPhoto from '../../assets/imgs/user.svg'

const EditProfile: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        occupation: '',
        interests: '',
        about: '',
        imageBinary: null
    })

    const [error, setError] = useState({
        isLoading: false,
        isFormInvalid: false,
        nameError: '',
        emailError: '',
        occupationError: '',
        interestsError: '',
        aboutError: '',
        mainError: ''
    })

    useEffect(() => validate('name'), [profile.name])
    useEffect(() => validate('email'), [profile.email])

    const validate = (field: string): void => {
        const { name, email } = profile
        const formData = { name, email }
        setError(error => ({ ...error, [`${field}Error`]: validation(field, formData) }))
        setError(error => ({ ...error, isFormInvalid: !!error.nameError || !!error.emailError }))
    }

    const validation = (field: string, formData: any): string => {
        const value = formData[field]
        switch (field) {
            case 'name':
                return value ? '' : 'Campo obrigatório'
            case 'email':
                return value ? '' : 'Campo obrigatório'
            default:
                return ''
        }
    }

    useEffect(() => {
        console.log('profile', profile)
    }, [profile])

    useEffect((): void => {
        fetchUserProfile()
            .then((userProfile) => {
                setProfile({
                    ...profile,
                    name: userProfile.name,
                    email: userProfile.email,
                })
            })
            .catch((error) => console.log(error))
    }, [])

    const fetchUserProfile = async (): Promise<UserProfile> => {
        const userId = getCurrentAccount()?.userId
        const userProfile = await loadUserProfile({ userId })
        return userProfile
    }


    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeTextArea = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        })
    }

    const handleImageChange = (event: any): void => {
        console.log('event', event.target.files[0])
        setProfile({ ...profile, [event.target.name]: event.target.files[0] })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (!error.isLoading && !error.isFormInvalid) {
                setError(oldProfile => ({ ...oldProfile, isLoading: true }))
                const session = getCurrentAccount()
                await updateUserProfile(profile, session)
                setProfile(oldProfile => ({ ...oldProfile, isLoading: false }))
                setError(oldError => ({ ...oldError, successMessage: 'Artigo adicionado!' }))
            }
        } catch (error: any) {
            setProfile({ ...profile })
            setError({ ...error, isLoading: false, mainError: error.message })
        }
    }

    return (
        <div className={styles.edit_profile}>
            <PageTitle title='Editar Perfil' />
            <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.row}>
                            <InputGroup onChange={handleChange} value={profile.name} title={error.nameError} type="text" name="name" label="Nome:" placeholder="Digite seu nome" />
                            <InputGroup onChange={handleChange} value={profile.email} title={error.nameError} type="text" name="nickname" label="Email:" placeholder="Digite seu email" />
                        </div>
                        <div className={styles.row}>
                            <InputGroup onChange={handleChange} title={error.nameError} type="text" name="occupation" label="Profissao:" placeholder="Digite sua profissão" />
                        </div>
                        <div className={styles.row}>
                            <InputGroup onChange={handleChange} title={error.nameError} type="text" name="interests" label="Interesses:" placeholder="Digite áreas e tecnologias em que tem interesse" />
                        </div>
                    </div>
                    <div className={styles.col}>
                        <InputImage imageFile={profile.imageBinary} imageDefault={DefaultPhoto} onChange={handleImageChange} />
                    </div>
                </div>
                <div className={styles.row}>
                    <TextAreaGroup className={styles.bigInput} onChange={handleChangeTextArea} title={error.aboutError} name="about" span="Sobre mim:" placeholder="Digite um pouco sobre você" />
                </div>
                <div className={styles.row}>
                    <FormStatus isLoading={error.isLoading} mainError={error.mainError} />
                    <CustomButton disabled={error.isFormInvalid} type="submit" value="Editar"> Editar </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default EditProfile
