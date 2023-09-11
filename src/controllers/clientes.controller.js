const { Op } = require('sequelize')
const clientesRepository = require('../repositories/clientes.repository')
const {
    validateInsereCliente,
    validateBuscaCliente,
    validateAtualizaCliente,
} = require('../utils/validator')
const { removeAspasDuplas } = require('../utils/removeAspasDuplas')
const filtroDinamico = require('../utils/filtrosDinamicos')
const { gerarSenhaBcrypt, validaSenhaBcrypt } = require('../utils/criptografia')

class ClientesController {
    async buscaClientes(req, res) {
        const dataRequest = req.query
        const filtrosValidados = validateBuscaCliente(dataRequest)

        if (filtrosValidados.error) {
            return res
                .status(422)
                .send({ message: filtrosValidados.error.toString() })
        }

        const filtrosBuscaClientes = filtroDinamico(dataRequest)

        const clientes = await clientesRepository.buscaClientes(
            filtrosBuscaClientes
        )
        return res.send(clientes)
    }

    async insereCliente(req, res) {
        const result = validateInsereCliente(req.body)
        if (result.error) {
            return res.status(422).json({
                message: removeAspasDuplas(result.error.details[0].message),
            })
        } else if (!result) {
            return res.status(422).json({ message: 'CPF Inválido' })
        }

        const { nome, cpf, email, telefone, placa, senha } = req.body

        const filtrosBuscaCliente = {
            [Op.or]: [{ cpf: cpf }, { email: email }],
        }
        const buscaCliente = await clientesRepository.buscaClientes(
            filtrosBuscaCliente
        )

        if (buscaCliente.length) {
            return res
                .status(422)
                .send({ message: 'O cliente já possui cadastro' })
        }
        const senhaHash = await gerarSenhaBcrypt(senha)
        if (!senhaHash) {
            return res.status(500).send({ message: 'Internal Server Error' })
        }
        const dadosParaInserir = {
            nome,
            cpf,
            email,
            senha: senhaHash,
            telefone,
            placa: !placa ? null : placa.toUpperCase(),
            status: 1,
        }
        const cliente = await clientesRepository.insereCliente(dadosParaInserir)

        return res.send(cliente)
    }

    async atualizaCliente(req, res) {
        const result = validateAtualizaCliente(req.body)
        if (result.error || !result) {
            return res.status(422).json({
                message: removeAspasDuplas(result.error.details[0].message),
            })
        }
        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaCliente = await clientesRepository.buscaClientes(
            dadosParaBusca
        )

        if (!buscaCliente) {
            return res
                .status(204)
                .send({ message: 'O cliente não foi encontrado' })
        }
        const { nome, cpf, email, telefone, status, placa, senha } = req.body

        const senhaHash = await validaSenhaBcrypt(senha, buscaCliente[0].senha)

        const dadosParaAtualizar = {
            nome,
            cpf,
            email,
            senha: senhaHash,
            telefone,
            status: [0, 1].includes(status) ? status : buscaCliente.status,
            placa: !placa ? null : placa.toUpperCase(),
        }
        await clientesRepository.atualizaCliente(
            dadosParaAtualizar,
            dadosParaBusca
        )
        return res
            .status(200)
            .send({ message: 'O cliente foi atualizado com sucesso' })
    }

    async deletaCliente(req, res) {
        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaCliente = await clientesRepository.buscaClientes(
            dadosParaBusca
        )
        if (!buscaCliente) {
            return res
                .status(204)
                .send({ message: 'O cliente não foi encontrado' })
        }
        if (!buscaCliente[0].status) {
            return res
                .status(422)
                .send({ message: 'O cliente já está inativo' })
        }
        const dadosParaAtualizar = { status: 0 }
        await clientesRepository.atualizaCliente(
            dadosParaAtualizar,
            dadosParaBusca
        )
        return res
            .status(200)
            .send({ message: 'O cliente foi cancelado com sucesso' })
    }
}

module.exports = new ClientesController()
