export type UserModel = {
    id: string
    name: string
    email: string
    occupation: string
    interests: string
    about: string
    imageUrl: string
}

export type UserProfile = Omit<UserModel, 'id'>