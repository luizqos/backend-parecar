const login = require('../controllers/login.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/all', login.buscaTodosUsuarios)
    router.post('/auth', login.buscaUsuario)
    app.use('/api/login', router)
}
