const reservasRepository = require('../repositories/reservas.repository')

class ReservasController {
    async buscaTodosReservas(req, res) {
        const { title } = req.query
        const reservas = await reservasRepository.buscaTodosReservas(title)
        return res.send(reservas)
    }

    async buscaReservaPorId(req, res) {
        const { id } = req.query
        const dadosWhere = { id: id }
        const reserva = await reservasRepository.buscaReservaPorId(dadosWhere)
        return res.send(reserva)
    }

    async insereReserva(req, res) {
        try {
            const {
                idcliente,
                idestacionamento,
                datahoraentrada,
                datahorasaida,
                vaga,
                placa,
                status,
            } = req.body
            //Validar se já existe uma reserva para determinada placa em um mesmo dia e horário
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
        const { id } = req.query
        const dadosParaBusca = { id: id }
        const buscaReserva = await reservasRepository.buscaReservaPorId(
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
        const buscaReserva = await reservasRepository.buscaReservaPorId(
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
