const clientes = require('../models/clientes.model')

class ClientesRepository {
    async buscaClientes(filtros) {
        try {
            return await clientes.findAll({
                raw: true,
                where: filtros,
                order: [['nome', 'ASC']],
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
