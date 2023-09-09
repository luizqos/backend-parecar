const clientes = require('../controllers/clientes.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', clientes.buscaClientes)
    router.post('/', clientes.insereCliente)
    router.put('/id', clientes.atualizaCliente)
    router.delete('/id', clientes.deletaCliente)
    app.use('/api/clientes', router)
}
