import axios from 'axios'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UnexpectedError } from '../errors/unexpected-error'
import { AccountModel } from '../models/account'

export type loadUserProfileParams = {
    userId: string
}

export type EditProfileParams = {
    name: string
    email: string
    occupation: string
    interests: string
    about: string
    imageBinary: File | null
}

const loadUserProfile = async (params: loadUserProfileParams) => {
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/users/${params.userId}`,
        method: 'get',
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

const updateUserProfile = async (params: EditProfileParams, session: AccountModel) => {
    const data = new FormData()

    data.append('name', params.name)
    data.append('email', params.email)
    data.append('ocuppation', params.occupation)
    data.append('interests', params.interests)
    data.append('about', params.about)
    data.append('imageBinary', JSON.stringify(params.imageBinary))

    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/users/profile`,
        method: 'put',
        data,
        headers: { 'x-access-token': session.accessToken }
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}


export { loadUserProfile, updateUserProfile }