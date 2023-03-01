export default (size) => {
    if (size > 1024 ** 3) {
        return (size/(1024**3)).toFixed(1) + "Gb"
    } else if (size > 1024 ** 2) {
        return (size/(1024 ** 2)).toFixed(1) + "Mb"
    } else if (size > 1024) {
        return (size/1024).toFixed(1) + "Kb"
    } else {
        return size + "B"
    }
}