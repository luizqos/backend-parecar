const estacionamentos = require('../models/estacionamentos.model')
const { Op } = require('sequelize')

class EstacionamentosRepository {
    async buscaTodosEstacionamentos(title) {
        try {
            return await estacionamentos.findAll()
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaEstacionamentoPorId(dadosWhere) {
        try {
            return await estacionamentos.findOne({ where: dadosWhere })
        } catch (error) {
            throw new Error(error)
        }
    }

    async insereEstacionamento(dadosParaInserir) {
        try {
            return await estacionamentos.create( dadosParaInserir )
        } catch (error) {
            throw new Error(error)
        }
    }
    async atualizarEstacionamento(dadosParaAtualizar,dadosParaBusca) {
        try {
            return await estacionamentos.Update(dadosParaAtualizar, {where: dadosParaBusca})
        } catch (error) {
            throw new Error(error)
        }
    }
    async deletarEstacionamento(dadosParaAtualizar,dadosParaBusca) {
        try {
            return await estacionamentos.delete(dadosParaAtualizar, {where: dadosParaBusca})
        } catch (error) {
            throw new Error(error)
        }
    }


}
module.exports = new EstacionamentosRepository()