export const getDateFormat = (date: any): string => {
    const ISODate = new Date(date)
    const month = ISODate.getMonth() + 1
    const monthConverter = month < 10 ? `0${month}` : month
    return `${ISODate.getDate()}-${(monthConverter)}-${ISODate.getFullYear()}`
}