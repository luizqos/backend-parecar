const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRepository = require('../repositories/login.repository')
const secretKey = process.env.SECRET_KEY

const saltRounds = 10

async function gerarSenhaBcrypt(senha) {
    const salt = await bcrypt.genSalt(saltRounds)
    const senhaHash = await bcrypt.hash(senha, salt)
    return senhaHash
}

class LoginController {
    async buscaTodosUsuarios(_req, res) {
        const login = await loginRepository.buscaTodosUsuarios()
        if (!login.length) {
            return res
                .status(204)
                .json({ message: 'Não foi encontrado nenhum registro' })
        }

        const dadosLoginTratados = login.map((login) => {
            login.documento =
                login.documento.substring(0, 4) +
                '*****' +
                login.documento.substring(login.documento.length - 2)
            delete login.senha
            return login
        })

        return res.send(dadosLoginTratados)
    }

    async buscaUsuario(req, res) {
        const { email, senha } = req.body
        const dadosWhere = {
            email,
            status: 1,
        }
        const login = await loginRepository.buscaUsuario(dadosWhere)
        if (!login || !bcrypt.compareSync(senha, login.senha)) {
            return res.status(401).json({ message: 'Credencial Inválida' })
        }

        const dadosToken = {
            id: login.id,
            tipo: login.tipo,
            email: login.email,
            status: login.status,
        }

        const token = jwt.sign(dadosToken, secretKey, { expiresIn: '1h' })
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
        const senhaHash = await gerarSenhaBcrypt(senha)
        if (!senhaHash) {
            return res.status(500).send({ message: 'Internal Server Error' })
        }

        const usuario = {
            ...dadosWhere,
            senha: senhaHash,
            tipo,
        }
        const usuarioCriado = await loginRepository.cadastraUsuario(usuario)

        return res.send(usuarioCriado)
    }
}

module.exports = new LoginController()
