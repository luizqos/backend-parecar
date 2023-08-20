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

    async insereCliente(req, res) {
        const { nome, cpf, email, telefone } = req.body
        //todo criar Validação de CPF, Email, Telefone, Nome(Sobrenome)
        //todo criar Validação de CPFS e emails iguais
        //return res.status(404).send({ message: 'O cliente já possui cadastro'}) Modelo de return de validação do cpf
        const dadosParaInserir = {
            nome,
            cpf,
            email,
            telefone,
            status: 1
        }
        const cliente = await clientesRepository.insereCliente(dadosParaInserir)
        return res.send(cliente)
    }

}

module.exports = new ClientesController()
