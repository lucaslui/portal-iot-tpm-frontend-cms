import { CategoryModel } from './category'
import { UserModel } from './user'

export type ArticleType = 'concepts' | 'news' | 'tutorials' | 'projects'

export type ArticleState = 'draft' | 'published' | 'deleted'

export type ArticleModel = {
    id: string
    title: string
    type: string
    state: string
    readTime: number
    description: string
    content: string
    imageUrl: string
    user: UserModel
    categories: CategoryModel[]
    createdAt: Date
    updatedAt: Date
}