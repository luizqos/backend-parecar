const historicoSenha = require('../models/historicosenha.model')

class HistoricoSenhaRepository {
    async insereHistoricoSenha(dadosParaInserir) {
        try {
            return await historicoSenha.create(dadosParaInserir)
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaHistoricoSenha(filtros) {
        try {
            return await historicoSenha.findAll({
                raw: true,
                where: filtros,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
    async atualizaHistoricoSenha(dadosParaAtualizar, dadosParaBusca) {
        try {
            return await historicoSenha.update(dadosParaAtualizar, {
                where: dadosParaBusca,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new HistoricoSenhaRepository()
