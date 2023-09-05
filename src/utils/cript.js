const bcrypt = require('bcrypt')

const saltRounds = 10

const gerarHash = (senha) => {
    return bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.error('Erro ao gerar salt:', err)
            return false
        } else {
            bcrypt.hash(senha, salt, function (err, hash) {
                if (err) {
                    console.error('Erro ao criar hash:', err)
                    return false
                } else {
                    return hash
                }
            })
        }
    })
}

const validaHash = (senha) => {
    bcrypt.compare(senha, hash, function (err, result) {
        if (err) {
            console.error('Erro ao verificar senha:', err)
        } else {
            if (result) {
                console.log('Senha correta')
                return true
            } else {
                console.log('Senha incorreta')
                return false
            }
        }
    })
}

module.exports = {
    gerarHash,
    validaHash,
}
