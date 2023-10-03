const estacionamentos = require('../controllers/estacionamentos.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', estacionamentos.buscaEstacionamentos)
    router.get('/location', estacionamentos.getGeoLocation)
    router.post('/', estacionamentos.insereEstacionamento)
    router.put('/', estacionamentos.atualizaEstacionamento)
    router.delete('/', estacionamentos.deletaEstacionamento)
    app.use('/api/estacionamentos', router)
}
