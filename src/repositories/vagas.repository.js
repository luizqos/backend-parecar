const vagas = require('../models/vagas.model')
const estacionamentos = require('../models/estacionamentos.model')
class VagasRepository {
    async buscaVagas(filtros) {
        try {
            return await vagas.findAll({
                where: filtros,
                include: [
                    {
                        model: estacionamentos,
                        required: true,
                        attributes: {
                            exclude: ['cnpj', 'senha'],
                        },
                    },
                ],
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async insereVaga(dadosParaInserir) {
        try {
            return await vagas.create(dadosParaInserir)
        } catch (error) {
            throw new Error(error)
        }
    }

    async atualizaVaga(dadosParaAtualizar, dadosParaBusca) {
        try {
            return await vagas.update(dadosParaAtualizar, {
                where: dadosParaBusca,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new VagasRepository()
