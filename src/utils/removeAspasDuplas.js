function removeAspasDuplas(texto) {
    return texto.replace(/"/g, '')
}
module.exports = { removeAspasDuplas }
