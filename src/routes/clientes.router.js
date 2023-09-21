const clientes = require('../controllers/clientes.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', clientes.buscaClientes)
    router.post('/', clientes.insereCliente)
    router.put('/', clientes.atualizaCliente)
    router.put('/altera-senha', clientes.alteraSenha)
    router.delete('/', clientes.deletaCliente)
    app.use('/api/clientes', router)
}
