const login = require('../models/login.model')
const { Op } = require('sequelize')

class LoginRepository {
    async buscaTodosUsuarios(title) {
        try {
            return await login.findAll()
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaUsuarioLoginSenha(dadosWhere) {
        try {
            return await login.findAll({ where: dadosWhere })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new LoginRepository()
