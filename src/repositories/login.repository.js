const login = require('../models/login.model')

class LoginRepository {
    async buscaLogin(filtros) {
        console.log(filtros)
        try {
            return await login.findAll({
                raw: true,
                where: filtros,
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaUsuario(filtrosBuscaLogin) {
        try {
            return await login.findOne({
                raw: true,
                where: filtrosBuscaLogin,
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async cadastraUsuario(usuario) {
        try {
            return await login.create(usuario)
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new LoginRepository()
