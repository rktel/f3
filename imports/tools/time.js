function addHours(time, hours) {
    let dateTime = new Date(time)
    dateTime.setHours(dateTime.getHours() + hours)
    return dateTime.toISOString()
}
function sortDescDevice(array) {
    return array.sort(
        (a, b) => new Date(b.connectionTime) - new Date(a.connectionTime)
    );
}
export { addHours, sortDescDevice }