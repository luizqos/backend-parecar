const estacionamentosRepository = require('../repositories/estacionamentos.repository')
const loginRepository = require('../repositories/login.repository')
const { Op } = require('sequelize')
const {
    validateInsereEstacionamento,
    validateBuscaEstacionamento,
    validateAtualizaEstacionamento,
} = require('../utils/validator')
const { removeAspasDuplas } = require('../utils/removeAspasDuplas')
const filtroDinamico = require('../utils/filtrosDinamicos')
const { gerarSenhaBcrypt, validaSenhaBcrypt } = require('../utils/criptografia')
const { buscaCoordenada } = require('../utils/buscaCoordenadas')

class EstacionamentosController {
    async buscaEstacionamentos(req, res) {
        const dataRequest = req.query
        const filtrosValidados = validateBuscaEstacionamento(dataRequest)

        if (filtrosValidados.error) {
            return res.send({ message: filtrosValidados.error.toString() })
        }

        const filtrosBuscaEstacionamentos = filtroDinamico(dataRequest)

        const estacionamentos =
            await estacionamentosRepository.buscaEstacionamentos(
                filtrosBuscaEstacionamentos
            )
        if (!estacionamentos.length) {
            return res
                .status(204)
                .json({ message: 'Não foi encontrado nenhum registro' })
        }

        const dadosEstacionamentosTratados = estacionamentos.map(
            (estacionamento) => {
                estacionamento.cnpj =
                    estacionamento.cnpj.substring(0, 4) +
                    '*****' +
                    estacionamento.cnpj.substring(
                        estacionamento.cnpj.length - 2
                    )
                delete estacionamento.senha
                return estacionamento
            }
        )

        return res.send(dadosEstacionamentosTratados)
    }

    async insereEstacionamento(req, res) {
        const result = validateInsereEstacionamento(req.body)
        if (result.error) {
            return res.status(422).json({
                message: removeAspasDuplas(result.error.details[0].message),
            })
        } else if (!result) {
            return res.status(422).json({ message: 'CNPJ Inválido' })
        }

        const {
            nomecontato,
            razaosocial,
            nomefantasia,
            cnpj,
            email,
            senha,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
        } = req.body

        const filtrosBuscaLogin = {
            [Op.or]: [{ documento: cnpj }, { email: email }],
        }
        const buscaLogin = await loginRepository.buscaLogin(filtrosBuscaLogin)
        if (buscaLogin.length) {
            return res
                .status(400)
                .send({ message: 'O estacionamento já possui cadastro' })
        }
        const senhaHash = await gerarSenhaBcrypt(senha)
        if (!senhaHash) {
            return res.status(500).send({ message: 'Erro Interno' })
        }
        const endereco = `${logradouro}, ${numero}, ${bairro}, ${cidade}-${estado}`
        const { latitude, longitude } = await buscaCoordenada(endereco)

        const dadosParaInserir = {
            nomecontato: !nomecontato ? null : nomecontato,
            razaosocial: razaosocial.toUpperCase(),
            nomefantasia: nomefantasia.toUpperCase(),
            cnpj,
            email: email.toLowerCase(),
            senha: senhaHash,
            telefone,
            cep,
            logradouro,
            numero,
            complemento: !complemento ? null : complemento,
            bairro,
            cidade,
            estado,
            latitude: parseFloat(latitude.toFixed(7)),
            longitude: parseFloat(longitude.toFixed(7)),
            status: 0,
        }
        const estacionamentos =
            await estacionamentosRepository.insereEstacionamento(
                dadosParaInserir
            )
        return res.send(estacionamentos)
    }

    async atualizaEstacionamento(req, res) {
        const result = validateAtualizaEstacionamento(req.body)
        if (result.error) {
            return res.status(422).json({
                message: removeAspasDuplas(result.error.details[0].message),
            })
        }
        const { id } = req.query
        const dadosParaBusca = { id: id }

        const buscaEstacionamento =
            await estacionamentosRepository.buscaEstacionamentos(dadosParaBusca)
        if (!buscaEstacionamento.length) {
            return res
                .status(400)
                .send({ message: 'O estacionamento não foi encontrado' })
        }

        const {
            nomecontato,
            razaosocial,
            nomefantasia,
            cnpj,
            email,
            senha,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            status,
            estado,
        } = req.body

        const filtrosBuscaLogin = {
            [Op.or]: [{ documento: cnpj }, { email: email }],
            id: { [Op.ne]: id },
        }
        const buscaLogin = await loginRepository.buscaLogin(filtrosBuscaLogin)
        if (buscaLogin.length) {
            return res
                .status(400)
                .send({ message: 'O estaciomento já possui cadastro' })
        }
        const senhaHash = await validaSenhaBcrypt(
            senha,
            buscaEstacionamento[0].senha
        )

        const formatarEndereco = (logradouro, numero, bairro, cidade, estado) =>
            `${logradouro}, ${numero}, ${bairro}, ${cidade}-${estado}`

        const enderecoInformado = formatarEndereco(
            logradouro,
            numero,
            bairro,
            cidade,
            estado
        )
        const enderecoRegistrado = formatarEndereco(
            buscaEstacionamento[0].logradouro,
            buscaEstacionamento[0].numero,
            buscaEstacionamento[0].bairro,
            buscaEstacionamento[0].cidade,
            buscaEstacionamento[0].estado
        )

        let latitude = buscaEstacionamento[0].latitude
        let longitude = buscaEstacionamento[0].longitude

        if (enderecoInformado !== enderecoRegistrado) {
            const coordenada = await buscaCoordenada(enderecoInformado)
            latitude = parseFloat(coordenada.latitude.toFixed(7))
            longitude = parseFloat(coordenada.longitude.toFixed(7))
        }
        const dadosParaAtualizar = {
            nomecontato,
            razaosocial: razaosocial.toUpperCase(),
            nomefantasia: nomefantasia.toUpperCase(),
            cnpj,
            email: email.toLowerCase(),
            senha: senhaHash,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            latitude,
            longitude,
            status: [0, 1].includes(status)
                ? status
                : buscaEstacionamento.status,
        }
        await estacionamentosRepository.atualizaEstacionamento(
            dadosParaAtualizar,
            dadosParaBusca
        )
        return res
            .status(200)
            .send({ message: 'O estacionamento foi atualizado com sucesso' })
    }

    async deletaEstacionamento(req, res) {
        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaEstacionamento =
            await estacionamentosRepository.buscaEstacionamentos(dadosParaBusca)

        if (!buscaEstacionamento.length) {
            return res
                .status(400)
                .send({ message: 'O estacionamento não foi encontrado' })
        }
        if (!buscaEstacionamento.status) {
            return res
                .status(422)
                .send({ message: 'O estacionamento já está inativo' })
        }
        const dadosParaAtualizar = { status: 0 }

        await estacionamentosRepository.atualizaEstacionamento(
            dadosParaAtualizar,
            dadosParaBusca
        )

        return res
            .status(200)
            .send({ message: 'O estacionamento foi cancelado com sucesso' })
    }
}
module.exports = new EstacionamentosController()
