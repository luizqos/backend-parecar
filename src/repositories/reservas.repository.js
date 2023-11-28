const clientes = require('../models/clientes.model')
const reservas = require('../models/reservas.model')
const vagas = require('../models/vagas.model')
const estacionamentos = require('../models/estacionamentos.model')
class ReservasRepository {
    async buscaReservas({ reserva, vaga, cliente, estacionamento }) {
        try {
            return await reservas.findAll({
                raw: true,
                nest: true,
                where: reserva,
                include: [
                    {
                        model: clientes,
                        required: true,
                        where: cliente,
                        attributes: {
                            exclude: ['cpf', 'senha'],
                        },
                    },
                    {
                        model: vagas,
                        required: true,
                        where: vaga,
                        attributes: {
                            exclude: [],
                        },
                        include: [
                            {
                                model: estacionamentos,
                                required: true,
                                where: estacionamento,
                                attributes: {
                                    exclude: ['cnpj', 'senha'],
                                },
                            },
                        ],
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
