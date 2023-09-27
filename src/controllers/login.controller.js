const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const loginRepository = require('../repositories/login.repository')
const historicosenhaRepository = require('../repositories/historicosenha.repository')
const { validateBuscaLogin } = require('../utils/validator')
const enviaEmail = require('../utils/enviaEmail')
const filtroDinamico = require('../utils/filtrosDinamicos')
const {
    templateAlteraSenha,
    assunto,
} = require('../templates/confirmacaoSenha')

const secretKey = process.env.SECRET_KEY

const saltRounds = 10

async function gerarSenhaBcrypt(senha) {
    const salt = await bcrypt.genSalt(saltRounds)
    const senhaHash = await bcrypt.hash(senha, salt)
    return senhaHash
}

class LoginController {
    async buscaLogin(req, res) {
        const dataRequest = req.query
        const filtrosValidados = validateBuscaLogin(dataRequest)

        if (filtrosValidados.error) {
            return res
                .status(422)
                .send({ message: filtrosValidados.error.toString() })
        }

        const filtrosBuscaLogin = filtroDinamico(dataRequest)
        const login = await loginRepository.buscaLogin(filtrosBuscaLogin)
        if (!login.length) {
            return res
                .status(400)
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

    async alteraSenha(req, res) {
        const { email, senha } = req.body
        const dadosParaBusca = { email: email }
        const buscaLogin = await loginRepository.buscaLogin(dadosParaBusca)

        if (!buscaLogin.length) {
            return res
                .status(400)
                .send({ message: 'O cliente não foi encontrado' })
        }
        const hash = uuidv4()
        const senhaHash = await gerarSenhaBcrypt(senha)
        if (!senhaHash) {
            return res.status(500).send({ message: 'Erro Interno' })
        }
        const dadosParaCriar = {
            link: hash,
            idlogin: buscaLogin[0].id,
            tipo: buscaLogin[0].tipo,
            senha: senhaHash,
        }
        const insereHistorico =
            await historicosenhaRepository.insereHistoricoSenha(dadosParaCriar)
        if (!insereHistorico) {
            return res
                .status(400)
                .send({ message: 'Ocorreu um erro ao inserir senha' })
        }
        const conteudo = templateAlteraSenha(hash)
        enviaEmail(email, assunto, conteudo)
        return res.status(200).send({
            message: `Enviamos para seu email um link de confirmação`,
        })
    }
}

module.exports = new LoginController()
