const clientesRepository = require('../repositories/clientes.repository')
const { Op } = require('sequelize');
const {
    validateInsereCliente,
    validateBuscaCliente,
} = require('../utils/validator')
const { removeAspasDuplas } = require('../utils/removeAspasDuplas')
const lidarFiltrosClientes = require('../functions/handleFiltersClients')

class ClientesController {
    async buscaClientes(req, res) {
        const dataRequest = req.query
        const filtrosValidados = validateBuscaCliente(dataRequest)

        if (filtrosValidados.error) {
            return res
                .status(422)
                .send({ message: filtrosValidados.error.toString() })
        }

        const filtrosBuscaClientes = lidarFiltrosClientes(dataRequest)

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

        const { nome, cpf, email, telefone } = req.body

        const filtrosBuscaCliente = {
            [Op.or]: [{ cpf: cpf }, { email: email }],
        }
        const buscaCliente = await clientesRepository.buscaClientes(filtrosBuscaCliente)
        console.log(buscaCliente.length)
        if (buscaCliente.length) {
            return res
                .status(422)
                .send({ message: 'O cliente já possui cadastro' })
        }
        return res.send('ok')
        //todo criar Validação de CPF, Email, Telefone, Nome(Sobrenome)
        //todo criar Validação de CPFS e emails iguais
        //return res.status(404).send({ message: 'O cliente já possui cadastro'}) Modelo de return de validação do cpf
        const dadosParaInserir = {
            nome,
            cpf,
            email,
            telefone,
            status: 1,
        }
        const cliente = await clientesRepository.insereCliente(dadosParaInserir)
        return res.send(cliente)
    }

    async atualizaCliente(req, res) {
        const { id } = req.query
        //todo criar Validação de Nome, CPF, Email, Telefone, Nome(Sobrenome)
        //todo criar Validação de CPFS e emails iguais
        const dadosParaBusca = { id: id }
        const buscaCliente = await clientesRepository.buscaClientePorId(
            dadosParaBusca
        )

        if (!buscaCliente) {
            return res
                .status(204)
                .send({ message: 'O cliente não foi encontrado' })
        }
        const { nome, cpf, email, telefone, status } = req.body
        const dadosParaAtualizar = {
            nome,
            cpf,
            email,
            telefone,
            status: [0, 1].includes(status) ? status : buscaCliente.status,
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
        const buscaCliente = await clientesRepository.buscaClientePorId(
            dadosParaBusca
        )

        if (!buscaCliente) {
            return res
                .status(204)
                .send({ message: 'O cliente não foi encontrado' })
        }
        const dadosParaAtualizar = { status: 0 }
        if (buscaCliente.status !== 0) {
            await clientesRepository.atualizaCliente(
                dadosParaAtualizar,
                dadosParaBusca
            )
        }

        return res
            .status(200)
            .send({ message: 'O cliente foi cancelado com sucesso' })
    }
}

module.exports = new ClientesController()
