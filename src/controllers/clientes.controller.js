/* eslint-disable no-undef */
const clientesRepository = require('../repositories/clientes.repository')

class ClientesController {
    async buscaTodosClientes(req, res) {
        const { title } = req.query
        const clientes = await clientesRepository.buscaTodosClientes(title)
        return res.send(clientes)
    }

}

module.exports = new ClientesController()
