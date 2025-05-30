import axios from 'axios'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UnexpectedError } from '../errors/unexpected-error'

export type SignInParams = {
    email: string
    password: string
}

export type SignUpParams = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}

const signin = async (params: SignInParams) => {
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/login`,
        method: 'post',
        data: params
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

const signup = async (params: SignUpParams) => {
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/signup`,
        method: 'post',
        data: params
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

export { signin, signup }