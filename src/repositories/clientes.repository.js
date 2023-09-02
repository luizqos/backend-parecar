const clientes = require('../models/clientes.model')
const Op = require('sequelize')

class ClientesRepository {
    async buscaClientes(filtros) {
        try {
            return await clientes.findAll({
                where: filtros,
                order: [['nome', 'ASC']],
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaClientesdinamico({ ...filtrosBuscaCliente }) {
        try {
            return await clientes.findAll({
                raw: true,
                where: {
                    [Op.or]: [
                        { cpf: '13383242684' },
                        { email: 'luizantonio500@hotmail.com' },
                    ],
                },
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async insereCliente(dadosParaInserir) {
        try {
            return await clientes.create(dadosParaInserir)
        } catch (error) {
            throw new Error(error)
        }
    }

    async atualizaCliente(dadosParaAtualizar, dadosParaBusca) {
        try {
            return await clientes.update(dadosParaAtualizar, {
                where: dadosParaBusca,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ClientesRepository()
