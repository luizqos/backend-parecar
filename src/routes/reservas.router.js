const reservas = require('../controllers/reservas.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', reservas.buscaReservas)
    router.post('/', reservas.insereReserva)
    router.put('/', reservas.atualizaReserva)
    router.delete('/', reservas.deletaReserva)
    app.use('/api/reservas', router)
}
