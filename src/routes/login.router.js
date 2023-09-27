const login = require('../controllers/login.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', login.buscaLogin)
    router.post('/auth', login.buscaUsuario)
    router.post('/create', login.criaUsuario)
    router.post('/altera-senha', login.alteraSenha)
    app.use('/api/login', router)
}
