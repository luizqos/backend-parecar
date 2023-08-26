const reservas = require('../controllers/reservas.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', reservas.buscaTodosReservas)
    router.get('/id', reservas.buscaReservaPorId)
    router.post('/', reservas.insereReserva)
    router.put('/id', reservas.atualizaReserva)
    router.delete('/id', reservas.deletaReserva)
    app.use('/api/reservas', router)
}