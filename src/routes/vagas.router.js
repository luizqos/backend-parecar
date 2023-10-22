const vagas = require('../controllers/vagas.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', vagas.buscaVagas)
    router.post('/', vagas.insereVaga)
    router.put('/', vagas.atualizaVaga)
    router.delete('/', vagas.deletaVaga)
    app.use('/api/vagas', router)
}
