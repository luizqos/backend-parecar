const clientes = require('../models/clientes.model')
const reservas = require('../models/reservas.model')
const estacionamentos = require('../models/estacionamentos.model')
class ReservasRepository {
    async buscaReservas(filtros) {
        try {
            return await reservas.findAll({
                where: filtros,
                include: [
                    {
                        model: clientes,
                        as: 'cliente',
                        required: true,
                        attributes: {
                            exclude: ['cpf', 'senha'],
                        },
                    },
                    {
                        model: estacionamentos,
                        as: 'estacionamento',
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

    async insereReserva(dadosParaInserir) {
        try {
            return await reservas.create(dadosParaInserir)
        } catch (error) {
            throw new Error(error)
        }
    }

    async atualizaReserva(dadosParaAtualizar, dadosParaBusca) {
        try {
            return await reservas.update(dadosParaAtualizar, {
                where: dadosParaBusca,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ReservasRepository()
