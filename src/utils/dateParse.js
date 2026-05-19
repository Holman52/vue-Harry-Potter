export const dateParse = (stringDate) =>{
    if (!stringDate) return new Date(0);
    const [day, month, year] = stringDate.split('-')
    return new Date(year, month - 1, day)
}