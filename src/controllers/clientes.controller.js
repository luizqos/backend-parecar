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

    async atualizaCliente(req,res) {
        const { id } = req.query
        //todo criar Validação de Nome, CPF, Email, Telefone, Nome(Sobrenome)
        //todo criar Validação de CPFS e emails iguais
        const dadosParaBusca = {id: id}
        const buscaCliente = await clientesRepository.buscaClientePorId(dadosParaBusca)

        if(!buscaCliente){
            return res.status(204).send({ message: 'O cliente não foi encontrado'})
        }
        const { nome, cpf, email, telefone, status } = req.body 
        const dadosParaAtualizar = {
            nome,
            cpf,
            email,
            telefone,
            status: [0, 1].includes(status) ? status : buscaCliente.status
        }
        await clientesRepository.atualizaCliente(dadosParaAtualizar, dadosParaBusca)
        return res.status(200).send({ message: 'O cliente foi atualizado com sucesso'})
    }

    async deletaCliente(req,res) {
        const { id } = req.query
        const dadosParaBusca = {id: id}
        const buscaCliente = await clientesRepository.buscaClientePorId(dadosParaBusca)

        if(!buscaCliente){
            return res.status(204).send({ message: 'O cliente não foi encontrado'})
        }
        const dadosParaAtualizar = {status: 0}
        if(buscaCliente.status !== 0 ){
            await clientesRepository.atualizaCliente(dadosParaAtualizar, dadosParaBusca)  
        }

        return res.status(200).send({ message: 'O cliente foi cancelado com sucesso'})
    }



}

module.exports = new ClientesController()
