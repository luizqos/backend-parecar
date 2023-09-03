const login = require('../models/login.model')

class LoginRepository {
    async buscaTodosUsuarios() {
        try {
            return await login.findAll()
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaUsuarioLoginSenha(dadosWhere) {
        try {
            return await login.findOne({
                raw: true,
                where: dadosWhere,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new LoginRepository()
