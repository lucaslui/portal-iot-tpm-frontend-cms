import axios from 'axios'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UnexpectedError } from '../errors/unexpected-error'
import { ArticleModel } from '../models/article'

export type LoadArticlesParams = {
    page?: number
    articleId?: string
    userId?: string
    categoryId?: string
    month?: number
    year?: number
}

export type AddArticleParams = {
    title: string
    description: string
    content: string
    imageBinary: File
    type: string
    categoryIds: string[]
}

const addArticle = async (params: AddArticleParams, accessToken: string): Promise<ArticleModel> => {
    const data = new FormData() 
    
    data.append('title', params.title)
    data.append('description', params.description)
    data.append('content', params.content)
    data.append('imageBinary', params.imageBinary)
    data.append('type', params.type)
    data.append('categoryIds', JSON.stringify(params.categoryIds))
    
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

const loadArticles = async (params?: LoadArticlesParams): Promise<ArticleModel[]> => {
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/articles`,
        method: 'get',
        data: params
    })

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

export { addArticle, loadArticles }