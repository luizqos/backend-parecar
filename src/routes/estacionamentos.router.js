const estacionamentos = require('../controllers/estacionamentos.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', estacionamentos.buscaTodosEstacionamentos)
    router.get('/id', estacionamentos.buscaEstacionamentoPorId)
    router.post('/', estacionamentos.insereEstacionamento)
    app.use('/api/estacionamentos', router)
}