const vagasRepository = require('../repositories/vagas.repository')
const {
    validateBuscaVagas,
    validateInsereVagas,
    validateAtualizaVagas,
} = require('../utils/validator')
const filtroDinamico = require('../utils/filtrosDinamicos')
class VagasController {
    async buscaVagas(req, res) {
        const dataRequest = req.query
        const filtrosValidados = validateBuscaVagas(dataRequest)
        if (filtrosValidados.error) {
            return res.send({ message: filtrosValidados.error.toString() })
        }
        const filtrosBuscaVagas = filtroDinamico(dataRequest)

        const vagas = await vagasRepository.buscaVagas(filtrosBuscaVagas)
        if (!vagas.length) {
            return res
                .status(204)
                .json({ message: 'Não foi encontrada nenhuma vaga' })
        }
        return res.send(vagas)
    }

    async insereVaga(req, res) {
        try {
            const { idestacionamento, vaga } = req.body
            const dataRequest = req.body
            const filtrosValidados = validateInsereVagas(dataRequest)
            if (filtrosValidados.error) {
                return res.send({ message: filtrosValidados.error.toString() })
            }

            const buscaVaga = await vagasRepository.buscaVagas(dataRequest)
            if (buscaVaga[0]) {
                return res.status(400).send({
                    message: 'Esta vaga já existe neste estacionamento',
                })
            }

            const dadosParaInserir = {
                idestacionamento,
                vaga,
                status: 1,
            }

            const vagaRegistrada = await vagasRepository.insereVaga(
                dadosParaInserir
            )
            return res.send(vagaRegistrada)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: error.message })
        }
    }

    async atualizaVaga(req, res) {
        const dataRequest = req.body
        const filtrosValidados = validateAtualizaVagas(dataRequest)
        if (filtrosValidados.error) {
            return res.send({ message: filtrosValidados.error.toString() })
        }
        const { vaga, status } = dataRequest

        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaVaga = await vagasRepository.buscaVagas(dadosParaBusca)
        if (buscaVaga.length <= 0) {
            return res.status(204).send({ message: 'Vaga não encontrada' })
        }
        const dadosParaAtualizar = {
            vaga,
            status: [0, 1].includes(status) ? status : buscaVaga.status,
        }

        await vagasRepository.atualizaVaga(dadosParaAtualizar, dadosParaBusca)
        return res
            .status(200)
            .send({ message: 'A vaga foi atualizada com sucesso' })
    }

    async deletaVaga(req, res) {
        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaVaga = await vagasRepository.buscaVagas(dadosParaBusca)
        if (buscaVaga.length <= 0) {
            return res.status(204).send({ message: 'Vaga não encontrada' })
        }
        if (!buscaVaga[0].status) {
            return res.status(422).send({ message: 'A vaga já está inativa' })
        }
        const dadosParaAtualizar = { status: 0 }

        await vagasRepository.atualizaVaga(dadosParaAtualizar, dadosParaBusca)
        return res
            .status(200)
            .send({ message: 'A reserva foi cancelada com sucesso' })
    }
}
module.exports = new VagasController()
