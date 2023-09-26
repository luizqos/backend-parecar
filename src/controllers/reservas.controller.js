const reservasRepository = require('../repositories/reservas.repository')
const { Op } = require('sequelize')
const {
    validateinsereReserva,
    validatebuscaReservas,
    validateatualizaReserva,
} = require('../utils/validator')
const { removeAspasDuplas } = require('../utils/removeAspasDuplas')
const filtroDinamico = require('../utils/filtrosDinamicos')

class ReservasController {
    async buscaReservas(req, res) {
        const dataRequest = req.query
        const filtrosValidados = validatebuscaReservas(dataRequest)
        if (filtrosValidados.error) {
            return res.send({ message: filtrosValidados.error.toString() })
        }
        const filtrosBuscaReservas = filtroDinamico(dataRequest)

        const reservas = await reservasRepository.buscaReservas(
            filtrosBuscaReservas
        )
        if (!reservas.length) {
            return res
                .status(204)
                .json({ message: 'Não foi encontrada nenhuma reserva' })
        }
        return res.send(reservas)
    }

    async insereReserva(req, res) {
        try {
            const dataReserva = new Date(req.body.datahoraentrada)

            const antecedenciaMinima = 30 * 60 * 1000
            if (dataReserva - new Date() < antecedenciaMinima) {
                return res.status(400).send({
                    message:
                        'A reserva deve ser feita com pelo menos 30 minutos de antecedência',
                })
            }
            const {
                idcliente,
                idestacionamento,
                datahoraentrada,
                datahorasaida,
                vaga,
                placa,
                status,
            } = req.body
            const dadosParaBusca = { placa, datahoraentrada }
            const existingReserva = await reservasRepository.buscaReservas(
                dadosParaBusca
            )
            if (!existingReserva) {
                return res
                    .status(400)
                    .send({ message: 'Já existe reserva para esta vaga.' })
            }

            const dadosParaInserir = {
                idcliente: idcliente,
                idestacionamento: idestacionamento,
                datahoraentrada: datahoraentrada,
                datahorasaida: datahorasaida,
                vaga: vaga,
                placa: placa,
                status: status,
            }
            const reserva = await reservasRepository.insereReserva(
                dadosParaInserir
            )
            return res.send(reserva)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: error.message })
        }
    }

    async atualizaReserva(req, res) {
        const result = validateatualizaReserva(req.body)
        if (result.error || !result) {
            return res.status(422).json({
                message: removeAspasDuplas(result.error.details[0].message),
            })
        }
        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaReserva = await reservasRepository.buscaReserva(
            dadosParaBusca
        )

        if (!buscaReserva) {
            return res.status(204).send({ message: 'Reserva não encontrada' })
        }
        const {
            idcliente,
            idestacionamento,
            datahoraentrada,
            datahorasaida,
            vaga,
            placa,
            status,
        } = req.body
        const dadosParaAtualizar = {
            idcliente,
            idestacionamento,
            datahoraentrada,
            datahorasaida,
            vaga,
            placa,
            status: [0, 1].includes(status) ? status : buscaReserva.status,
        }

        await reservasRepository.atualizaReserva(
            dadosParaAtualizar,
            dadosParaBusca
        )
        return res
            .status(200)
            .send({ message: 'A reserva foi atualizada com sucesso' })
    }
    async deletaReserva(req, res) {
        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaReserva = await reservasRepository.buscaReserva(
            dadosParaBusca
        )

        if (!buscaReserva) {
            return res.status(204).send({ message: 'Reserva não encontrada' })
        }
        const dadosParaAtualizar = { status: 0 }
        if (buscaReserva.status !== 0) {
            await reservasRepository.atualizaReserva(
                dadosParaAtualizar,
                dadosParaBusca
            )
        }

        return res
            .status(200)
            .send({ message: 'A reserva foi cancelada com sucesso' })
    }
}

module.exports = new ReservasController()
