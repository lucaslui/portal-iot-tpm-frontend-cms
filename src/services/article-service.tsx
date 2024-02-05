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

const loadArticles = async (params?: LoadArticlesParams): Promise<ArticleModel[]> => {
    const httpResponse = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/api/articles`,
        method: 'get',
        data: params
    })

    console.log(httpResponse)

    switch (httpResponse.status) {
        case 200: return httpResponse.data
        case 403: throw new InvalidCredentialsError()
        default: throw new UnexpectedError()
    }
}

export { loadArticles }