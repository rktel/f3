function addHours(time, hours) {
    if (time.length > 0) {
        let dateTime = new Date(time)
        dateTime.setHours(dateTime.getHours() + hours)
        return dateTime.toISOString()
    } else { return '0' }

}
function sortDescDevice(array) {
    return array.sort(
        (a, b) => new Date(b.connectionTime) - new Date(a.connectionTime)
    );
}
export { addHours, sortDescDevice }