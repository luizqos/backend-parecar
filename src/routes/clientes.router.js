const clientes = require('../controllers/clientes.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', clientes.buscaTodosClientes)
    app.use('/api/clientes', router)
}
