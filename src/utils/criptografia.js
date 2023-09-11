const bcrypt = require('bcrypt')
const saltRounds = 10
async function gerarSenhaBcrypt(senha) {
    const salt = await bcrypt.genSalt(saltRounds)
    const senhaHash = await bcrypt.hash(senha, salt)
    return senhaHash
}

async function validaSenhaBcrypt(senhaBody, senhaBanco) {
    const senhaHash = !bcrypt.compareSync(senhaBody, senhaBanco)
        ? await gerarSenhaBcrypt(senhaBody)
        : senhaBanco
    return senhaHash
}
module.exports = {
    gerarSenhaBcrypt,
    validaSenhaBcrypt,
}
