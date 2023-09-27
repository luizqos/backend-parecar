const historicoSenha = require('../models/historicosenha.model')

class HistoricoSenhaRepository {
    async insereHistoricoSenha(dadosParaInserir) {
        try {
            return await historicoSenha.create(dadosParaInserir)
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new HistoricoSenhaRepository()
