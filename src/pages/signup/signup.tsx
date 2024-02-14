import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './signup.module.scss'

import AccountContext from '../../contexts/account-context'

import { signup } from '../../services/auth-service'

import { Logo, Input, CustomButton, FormStatus } from '../../components'

const SignUpPage: React.FC = () => {
    const { setCurrentAccount } = useContext(AccountContext)

    const navigate = useNavigate()

    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: false,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        nameError: '',
        emailError: '',
        passwordError: '',
        passwordConfirmationError: '',
        mainError: ''
    })

    //   useEffect(() => validate('name'), [state.name])
    //   useEffect(() => validate('email'), [state.email])
    //   useEffect(() => validate('password'), [state.password])
    //   useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

    //   const validate = (field: string): void => {
    //     const { name, email, password, passwordConfirmation } = state
    //     const formData = { name, email, password, passwordConfirmation }
    //     setState(oldState => ({ ...oldState, [`${field}Error`]: validation.validate(field, formData) }))
    //     setState(oldState => ({ ...oldState, isFormInvalid: !!oldState.nameError || !!oldState.emailError || !!oldState.passwordError || !!oldState.passwordConfirmationError }))
    //   }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (!state.isLoading && !state.isFormInvalid) {
                setState(oldState => ({
                    ...oldState,
                    isLoading: true
                }))
                const account = await signup({
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    passwordConfirmation: state.passwordConfirmation
                })
                if (account?.accessToken) {
                    setCurrentAccount && setCurrentAccount({ accessToken: account.accessToken, userId: account.userId })
                    navigate('/')
                }
            }
        } catch (error: any) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.signup}>
            <Logo />
            <hr />
            <div className={styles.form}>
                <h2>Criar Conta</h2>
                <Input onChange={handleChange} title={state.nameError} type="text" name="name" placeholder="Digite seu nome" />
                <Input onChange={handleChange} title={state.emailError} type="email" name="email" placeholder="Digite seu e-mail" />
                <Input onChange={handleChange} title={state.passwordError} type="password" name="password" placeholder="Digite sua senha" />
                <Input onChange={handleChange} title={state.passwordConfirmationError} type="password" name="passwordConfirmation" placeholder="Digite sua senha novamente" />
                <CustomButton disabled={state.isFormInvalid} type="submit" value="Criar"> Criar </CustomButton>
                <Link to="/auth/signin" className={styles.link}> Já tem cadastro? clique aqui </Link>
                <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
            </div>
        </form>
    )
}

export default SignUpPage
