import React, { useState, useEffect, useContext } from 'react'

import styles from './profile.module.scss'

import { PageTitle, InputGroup, TextAreaGroup, FormStatus, CustomButton } from '../../components'
import { loadUserProfile, updateUserProfile } from '../../services/user-service'
import AccountContext from '../../contexts/account-context'
import InputImage from '../../components/input-image/input-image'
import DefaultPhoto from '../../assets/imgs/user.svg'
import { UserProfile } from '../../models/user'

const Profile: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        occupation: '',
        interests: '',
        about: '',
        imageUrl: '',
        imageBinary: null
    })

    const [status, setStatus] = useState({
        isLoading: false,
        mainError: '',
        successMessage: '',
    })

    const checkValidation = (field: string, formData: any): string => {
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

    const nameFieldError = checkValidation('name', profile)
    const emailFieldError = checkValidation('email', profile)

    const isFormInvalid = !!nameFieldError || !!emailFieldError

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
                    occupation: userProfile.occupation,
                    interests: userProfile.interests,
                    about: userProfile.about,
                    imageUrl: userProfile.imageUrl,
                })
            })
            .catch((error) => console.log(error))
    }, [])

    const fetchUserProfile = async (): Promise<UserProfile> => {
        const userId = getCurrentAccount()?.userId
        const userProfile = await loadUserProfile({ userId })
        return userProfile
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        })
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.files?.[0]
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (!status.isLoading && !isFormInvalid) {
                setStatus(error => ({ ...error, isLoading: true }))
                const session = getCurrentAccount()
                await updateUserProfile(profile, session)
                setStatus(error => ({ ...error, isLoading: false, successMessage: 'Perfil Salvo!' }))
            }
        } catch (error: any) {
            setProfile({ ...profile })
            setStatus({ ...error, isLoading: false, mainError: error.message })
        }
    }

    return (
        <div className={styles.profile}>
            <PageTitle title='Editar Perfil' />
            <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.row}>
                            <InputGroup
                                value={profile.name}
                                onChange={handleChange}
                                title={nameFieldError}
                                type="text"
                                name="name"
                                label="Nome:"
                                placeholder="Digite seu nome" />
                            <InputGroup
                                value={profile.email}
                                onChange={handleChange}
                                title={emailFieldError}
                                type="text"
                                name="nickname"
                                label="Email:"
                                placeholder="Digite seu email..." />
                        </div>
                        <div className={styles.row}>
                            <InputGroup
                                value={profile.occupation}
                                onChange={handleChange}
                                type="text"
                                name="occupation"
                                label="Profissao:"
                                placeholder="Digite sua profissao..." />
                        </div>
                        <div className={styles.row}>
                            <InputGroup
                                value={profile.interests}
                                onChange={handleChange}
                                type="text"
                                name="interests"
                                label="Interesses:"
                                placeholder="Digite áreas e tecnologias em que tem interesse..." />
                        </div>
                    </div>
                    <div className={styles.col}>
                        <InputImage
                            label="Foto de Perfil:"
                            name="imageBinary"
                            imagePreview={profile.imageUrl}
                            imageDefault={DefaultPhoto}
                            onChange={handleImageChange} />
                    </div>
                </div>
                <div className={styles.row}>
                    <TextAreaGroup
                        value={profile.about}
                        onChange={handleChangeTextArea}
                        className={styles.bigInput}
                        name="about"
                        span="Sobre mim:"
                        placeholder="Digite um pouco sobre você..." />
                </div>
                <div className={`${styles.row} ${styles.flex_end}`}>
                    <FormStatus
                        isLoading={status.isLoading}
                        mainError={status.mainError}
                        successMessage={status.successMessage} />
                    <CustomButton
                        disabled={isFormInvalid}
                        type="submit">
                        Salvar
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default Profile
