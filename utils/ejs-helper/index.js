function getEnumName(obj) {
    return obj.type.name.split('_').at(-1)
}

module.exports = {
    getEnumName
}
