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
            estado } = req.body
        
        //todo criar Validação de cnpj, Email, Telefone, endereço,razaosocial
        //todo criar Validação de cnpj e emails iguais
        //return res.status(404).send({ message: 'O estacionamento já possui cadastro'}) Modelo de return de validação do cpf
        const dadosParaInserir = {
            nomecontato :!nomecontato ? null : nomecontato,
            razaosocial,
            nomefantasia,
            cnpj,
            email,
            telefone,
            cep,
            logradouro,
            numero,
            complemento : !complemento ? null : complemento,
            bairro,
            cidade,
            estado
        }
        const estacionamentos = await estacionamentosRepository.insereEstacionamento(dadosParaInserir)
        return res.send(estacionamentos)
    }

}

module.exports = new EstacionamentosController()
