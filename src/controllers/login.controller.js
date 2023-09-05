const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRepository = require('../repositories/login.repository')
const { gerarHash } = require('../utils/cript')
const secretKey = process.env.SECRET_KEY

class LoginController {
    async buscaTodosUsuarios(_req, res) {
        const login = await loginRepository.buscaTodosUsuarios()
        return res.send(login)
    }

    async buscaUsuario(req, res) {
        const { email, senha } = req.body
        console.log(req.body)
        const dadosWhere = {
            usuario: email,
            status: 1,
        }
        const login = await loginRepository.buscaUsuario(dadosWhere)
        if (!login || !bcrypt.compareSync(senha, login.senha)) {
            return res.status(401).json({ message: 'Credencial Inválida' })
        }
        const token = jwt.sign(login, secretKey, { expiresIn: '1h' })
        return res.send({ token })
    }

    async criaUsuario(req, res) {
        const { email, senha, tipo } = req.body

        const dadosWhere = {
            usuario: email,
        }
        const login = await loginRepository.buscaUsuario(dadosWhere)
        if (login) {
            return res.status(400).json({ message: 'Usuário já existente' })
        }
        const senhaHash = gerarHash(senha)

        const usuario = {
            ...dadosWhere,
            senha: senhaHash,
            tipo,
        }

        console.log(usuario)

        const usuarioCriado = await loginRepository.cadastraUsuario(usuario)

        return res.send(usuarioCriado)
    }
}

module.exports = new LoginController()
