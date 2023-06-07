export const formatUnixDate = date => {
    const newDate = new Date(date*1000)
    return newDate.toLocaleDateString('ru', { dateStyle: 'long' }).slice(0, -3)
}