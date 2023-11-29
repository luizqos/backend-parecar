const estacionamentos = require('../controllers/estacionamentos.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', estacionamentos.buscaEstacionamentos)
    router.post('/', estacionamentos.insereEstacionamento)
    router.put('/', estacionamentos.atualizaEstacionamento)
    router.delete('/', estacionamentos.deletaEstacionamento)
    router.get('/vagas-disponiveis', estacionamentos.vagasDisponiveis)
    app.use('/api/estacionamentos', router)
}

