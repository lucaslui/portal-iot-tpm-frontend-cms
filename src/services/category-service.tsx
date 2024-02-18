import axios from 'axios'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UnexpectedError } from '../errors/unexpected-error'
import { ArticleModel } from '../models/article'

export type CategoriesTreeModel = {
    id: string
    name: string
    description: string
    children: CategoriesTreeModel[]
}

export type AddArticleParams = {
    title: string
    description: string
    content: string
    imageBinary: File | null
    type: string
    categoryIds: string[]
}

const addArticle = async (params: AddArticleParams, accessToken: string): Promise<ArticleModel> => {
    const data = new FormData()

    data.append('title', params.title)
    data.append('description', params.description)
    data.append('content', params.content)
    data.append('type', params.type)
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

const loadCategoriesTree = async (): Promise<CategoriesTreeModel[]> => {
    // pass as query parameters in request
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/categories/tree`,
        method: 'get',
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

export { addArticle, updateArticle, loadCategoriesTree }