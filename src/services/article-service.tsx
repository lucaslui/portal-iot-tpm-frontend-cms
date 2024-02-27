import axios from 'axios'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UnexpectedError } from '../errors/unexpected-error'
import { ArticleModel } from '../models/article'

export type LoadArticlesParams = {
    page?: number
    limit?: number
    userId?: string
    categoryId?: string
    month?: number
    year?: number
}

export type AddArticleParams = {
    title: string
    description: string
    type: string
    state: string
    readTime: number
    content: string
    imageBinary: File | null
    categoryIds: string[]
}

const addArticle = async (params: AddArticleParams, accessToken: string): Promise<ArticleModel> => {
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
        url: `${import.meta.env.VITE_API_URL}/api/articles`,
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

const updateArticle = async (articleId: string, params: AddArticleParams, accessToken: string,): Promise<void> => {
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
        url: `${import.meta.env.VITE_API_URL}/api/articles/${articleId}`,
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

export type ArticlesPaginatedModel = {
    articles: ArticleModel[]
    count: number
    page: number
    totalPages: number
    totalItems: number
}

const loadArticles = async (params?: LoadArticlesParams): Promise<ArticlesPaginatedModel> => {
    // pass as query parameters in request
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/articles`,
        method: 'get',
        params
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

export { addArticle, updateArticle, loadArticles }