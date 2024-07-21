export type PaginationModel<T> = {
    data: T[]
    count: number
    page: number
    totalPages: number
    totalItems: number
}  