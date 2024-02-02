import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './signin.module.scss'

import AccountContext from '../../contexts/account-context'

import { Button, FormStatus, Input, Logo } from '../../components'
import { signin } from '../../services/auth-service'

const SignInPage: React.FC = () => {
    const { setCurrentAccount } = useContext(AccountContext)
    const navigate = useNavigate()

    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: ''
    })

    //   useEffect(() => validate('email'), [state.email])
    //   useEffect(() => validate('password'), [state.password])

    //   const validate = (field: string): void => {
    //     const { email, password } = state
    //     const formData = { email, password }
    //     setState(oldState => ({ ...oldState, [`${field}Error`]: validation.validate(field, formData) }))
    //     setState(oldState => ({ ...oldState, isFormInvalid: !!oldState.emailError || !!oldState.passwordError }))
    //   }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (!state.isLoading && !state.isFormInvalid) {
                setState(oldState => ({
                    ...oldState,
                    isLoading: true
                }))
                const account = await signin({ email: state.email, password: state.password })
                if (account?.accessToken) {
                    setCurrentAccount && setCurrentAccount({ accessToken: account.accessToken })
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
        <form className={styles.signin} onSubmit={handleSubmit}>
            <Logo />
            <hr />
            <div className={styles.signin_form}>
                <h2>Login</h2>
                <Input onChange={handleChange} title={state.emailError} type="email" name="email" placeholder="Digite seu e-mail" />
                <Input onChange={handleChange} title={state.passwordError} type="password" name="password" placeholder="Digite sua senha" />
                <Button disabled={state.isFormInvalid} type="submit"> Entrar </Button>
                <Link to="/auth/signup" className={styles.link}>Não tem cadastro? Cadastre-se aqui</Link>
                <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
            </div>
        </form>
    )
}

export default SignInPage
