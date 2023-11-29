const estacionamentos = require('../models/estacionamentos.model')
const vagas = require('../models/vagas.model')
const funcionamento = require('../models/funcionamento.model')

class EstacionamentosRepository {
    async buscaEstacionamentos(filtros) {
        try {
            return await estacionamentos.findAll({
                raw: true,
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

    async buscaVagas(dadosParaBusca) {
        try {
            return await estacionamentos.findAll({
                include: [
                    {
                        model: vagas,
                        where: dadosParaBusca.vaga,
                        required: true,
                    },
                    {
                        model: funcionamento,
                        where: dadosParaBusca.funcionamento,
                        required: true,
                    },
                ],
                where: dadosParaBusca.geral,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new EstacionamentosRepository()
