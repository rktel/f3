export const addHours = (time, hours) => {
    let dateTime = new Date(time)
    dateTime.setHours(dateTime.getHours() + hours)
    return dateTime
}