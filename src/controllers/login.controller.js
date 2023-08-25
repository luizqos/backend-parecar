/* eslint-disable no-undef */
const loginRepository = require('../repositories/login.repository')

class LoginController {
    async buscaTodosUsuarios(_req, res) {
        const login = await loginRepository.buscaTodosUsuarios()
        return res.send(login)
    }

    async buscaUsuarioLoginSenha(req, res){
          const { usuario, senha } = req.body
        const dadosWhere = {
            usuario: usuario, 
            senha: senha,
            status: 1
        }
        const login = await loginRepository.buscaUsuarioLoginSenha(dadosWhere)
      
        return res.send(login)
    }
}

module.exports = new LoginController()
