export type ArticleModel = {
    // id?: string
    // title: string
    // description: string
    // type: string
    // content: string
    // imageUrl: string
    // userId: string
    // categoryId: string
    // categories: any
    // updatedAt: string
    // createdAt: string
    id: string
    title: string
    description: string
    content: string
    imageUrl: string
    user: {
      id: string
      name: string
      email: string
      occupation: string
      interests: string
      about: string
      imageUrl: string
    }
    categories: {
      id: string
      name: string
      description: string
    }
    type: string
    createdAt: Date
    updatedAt: Date
}

export type ArticleViewModel = {
    id: string
    title: string
    description: string
    content: string
    imageUrl: string
    user: {
      id: string
      name: string
      email: string
      occupation: string
      interests: string
      about: string
      imageUrl: string
    }
    categories: {
      id: string
      name: string
      description: string
    }
    type: string
    createdAt: Date
    updatedAt: Date
}