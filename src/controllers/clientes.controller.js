/* eslint-disable no-undef */
const clientesRepository = require('../repositories/clientes.repository')

class ClientesController {
    async buscaTodosClientes(req, res) {
        const { title } = req.query
        const clientes = await clientesRepository.buscaTodosClientes(title)
        return res.send(clientes)
    }

    async buscaClientePorId(req, res){
        const { id } = req.query
        const dadosWhere = {id: id}
        const cliente = await clientesRepository.buscaClientePorId(dadosWhere)
        return res.send(cliente)
    }

}

module.exports = new ClientesController()
