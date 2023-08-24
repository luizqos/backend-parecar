const clientes = require('../models/clientes.model')
const { Op } = require('sequelize')

class ClientesRepository {
    async buscaTodosClientes(title) {
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await clientes.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaClientePorId(dadosWhere) {
        try {
            return await clientes.findOne({ where: dadosWhere })
        } catch (error) {
            throw new Error(error)
        }
    }

    async insereCliente(dadosParaInserir) {
        try {
            return await clientes.create( dadosParaInserir )
        } catch (error) {
            throw new Error(error)
        }
    }

    async atualizaCliente(dadosParaAtualizar, dadosParaBusca) {
      try {
           return await clientes.update(dadosParaAtualizar, {where: dadosParaBusca})
      } catch (error) {
         throw new Error(error)
      }
    }


}
module.exports = new ClientesRepository()
