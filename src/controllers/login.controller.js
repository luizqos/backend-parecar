const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRepository = require('../repositories/login.repository')

const secretKey = process.env.SECRET_KEY

class LoginController {
    async buscaTodosUsuarios(_req, res) {
        const login = await loginRepository.buscaTodosUsuarios()
        return res.send(login)
    }

    async buscaUsuario(req, res) {
        const { usuario, senha } = req.body
        const dadosWhere = {
            usuario: usuario,
            status: 1,
        }
        const login = await loginRepository.buscaUsuario(dadosWhere)

        if (!login || !bcrypt.compareSync(senha, login.senha)) {
            return res.status(401).json({ message: 'Credencial Inválida' })
        }

        const token = jwt.sign(login, secretKey, { expiresIn: '1h' })
        return res.send({ token })
    }
}

module.exports = new LoginController()
