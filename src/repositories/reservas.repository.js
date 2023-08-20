const reservas = require('../models/reservas.model')
const { Op } = require('sequelize')

class ReservasRepository {
    async buscaTodosReservas(title) {
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await reservas.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaReservaPorId(dadosWhere) {
        try {
            return await reservas.findOne({ where: dadosWhere })
        } catch (error) {
            throw new Error(error)
        }
    }

    async insereReserva(dadosParaInserir) {
        try {
            return await reservas.create( dadosParaInserir )
        } catch (error) {
            throw new Error(error)
        }
    }


}
module.exports = new ReservasRepository()