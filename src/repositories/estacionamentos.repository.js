const estacionamentos = require('../models/estacionamentos.model')

class EstacionamentosRepository {
    async buscaEstacionamentos(filtros) {
        try {
            return await estacionamentos.findAll({
                where: filtros,
                order: [['id', 'ASC']],
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async insereEstacionamento(dadosParaInserir) {
        try {
            return await estacionamentos.create(dadosParaInserir)
        } catch (error) {
            throw new Error(error)
        }
    }
    async atualizaEstacionamento(dadosParaAtualizar, dadosWhere) {
        try {
            return await estacionamentos.update(dadosParaAtualizar, {
                where: dadosWhere,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new EstacionamentosRepository()
