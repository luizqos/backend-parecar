const estacionamentosRepository = require('../repositories/estacionamentos.repository')

class EstacionamentosController {
    async buscaTodosEstacionamentos(_req, res) {
        const estacionamentos = await estacionamentosRepository.buscaTodosEstacionamentos()
        return res.send(estacionamentos)
    }

    async buscaEstacionamentoPorId(req, res) {
        const { id } = req.query
        const dadosWhere = { id: id }
        const estacionamentos = await estacionamentosRepository.buscaEstacionamentoPorId(dadosWhere)
        return res.send(estacionamentos)


    }
    async atualizaEstacionamento(req, res) {
        const { id } = req.query
        const dadosWhere = {id : id}
       const estacionamentos = await estacionamentosRepository.buscaEstacionamentoPorId(dadosWhere)
        if (!estacionamentos) {
            return res.status(204).send({ message: 'O estacionamento não foi encontrado' })
        }
        const { nomecontato,
            razaosocial,
            nomefantasia,
            cnpj,
            email,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            status,
            estado } = req.body
        const dadosParaAtualizar = {
            nomecontato,
            razaosocial,
            nomefantasia,
            cnpj,
            email,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            status: [0, 1].includes(status) ? status : estacionamentos.status

        }
        await estacionamentosRepository.atualizaEstacionamento(dadosParaAtualizar,dadosWhere)
        return res.status(200).send({ message: 'O estacionamento foi atualizado com sucesso' })
    }



    async deletaEstacionamento(req, res) {
        const { id } = req.query
        const dadosWhere = { id: id }
        const estacionamentos = await estacionamentosRepository.buscaEstacionamentoPorId(dadosWhere)

        if (!estacionamentos) {
            return res.status(204).send({ message: 'O estacionamento não foi encontrado' })
        }
        const dadosParaAtualizar = { status: 0 }
        if (estacionamentos.status !== 0) {
            await estacionamentosRepository.atualizaEstacionamento(dadosParaAtualizar, dadosWhere)
        }

        return res.status(200).send({ message: 'O estacionamento foi cancelado com sucesso' })
    }



    async insereEstacionamento(req, res) {
        const { nomecontato,
            razaosocial,
            nomefantasia,
            cnpj,
            email,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            status,
            estado } = req.body

        //todo criar Validação de cnpj, Email, Telefone, endereço,razaosocial
        //todo criar Validação de cnpj e emails iguais
        //return res.status(404).send({ message: 'O estacionamento já possui cadastro'}) Modelo de return de validação do cpf
        const dadosParaInserir = {
            nomecontato: !nomecontato ? null : nomecontato,
            razaosocial,
            nomefantasia,
            cnpj,
            email,
            telefone,
            cep,
            logradouro,
            numero,
            complemento: !complemento ? null : complemento,
            bairro,
            cidade,
            status,
            estado
        }
        const estacionamentos = await estacionamentosRepository.insereEstacionamento(dadosParaInserir)
        return res.send(estacionamentos)
    }

}

module.exports = new EstacionamentosController()
