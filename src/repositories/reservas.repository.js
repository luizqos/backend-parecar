const reservas = require('../models/reservas.model')

class ReservasRepository {
    async buscaReservas(filtros) {
        try {
            return await reservas.findAll({
                raw: true,
                where: filtros,
                order: [['id', 'ASC']],
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
