const jwt = require('jsonwebtoken')
const loginRepository = require('../repositories/login.repository')

const secretKey = process.env.SECRET_KEY

class LoginController {
    async buscaTodosUsuarios(_req, res) {
        const login = await loginRepository.buscaTodosUsuarios()
        return res.send(login)
    }

    async buscaUsuarioLoginSenha(req, res) {
        const { usuario, senha } = req.body
        const dadosWhere = {
            usuario: usuario,
            senha: senha,
            status: 1,
        }
        const login = await loginRepository.buscaUsuarioLoginSenha(dadosWhere)
        if (!login) {
            return res.status(401).json({ message: 'Senha incorreta' })
        }
        const token = jwt.sign(login, secretKey, { expiresIn: '1h' })
        return res.send({ token })
    }
}

module.exports = new LoginController()
