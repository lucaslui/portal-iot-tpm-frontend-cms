import axios from 'axios'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UnexpectedError } from '../errors/unexpected-error'
import { CourseModel } from '../models/course'
import { PaginationModel } from '../models/shared/pagination'

export type LoadCoursesParams = {
    search?: string
    page?: number
    limit?: number
    userId?: string
    categoryId?: string
    month?: number
    year?: number
}

export type AddCourseParams = {
    title: string
    description: string
    type: string
    state: string
    readTime: number
    content: string
    imageBinary: File | null
    categoryIds: string[]
}

const addCourse = async (params: AddCourseParams, accessToken: string): Promise<CourseModel> => {
    const data = new FormData()

    data.append('title', params.title)
    data.append('description', params.description)
    data.append('content', params.content)
    data.append('type', params.type)
    data.append('state', params.state)
    data.append('readTime', params.readTime.toString())
    data.append('categoryIds', JSON.stringify(params.categoryIds))

    if (params.imageBinary) {
        data.append('imageBinary', params.imageBinary)
    }

    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/courses`,
        method: 'POST',
        data,
        headers: { 'x-access-token': accessToken }
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

const updateCourse = async (courseId: string, params: AddCourseParams, accessToken: string,): Promise<void> => {
    const data = new FormData()

    data.append('title', params.title)
    data.append('description', params.description)
    data.append('content', params.content)
    data.append('type', params.type)
    data.append('state', params.state)
    data.append('readTime', params.readTime.toString())
    data.append('categoryIds', JSON.stringify(params.categoryIds))

    if (params.imageBinary) {
        data.append('imageBinary', params.imageBinary)
    }

    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/courses/${courseId}`,
        method: 'PUT',
        data,
        headers: { 'x-access-token': accessToken }
    })

    switch (httpResponse.status) {
        case 204: return
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

const loadCourses = async (params?: LoadCoursesParams): Promise<PaginationModel<CourseModel>> => {
    // pass as query parameters in request
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/courses`,
        method: 'get',
        params
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

export { addCourse, updateCourse, loadCourses }