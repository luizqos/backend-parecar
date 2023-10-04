const faker = require('../controllers/faker.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/estacionamento', faker.montaEstacionamento)
    app.use('/api/faker', router)
}
