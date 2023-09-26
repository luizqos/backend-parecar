const reservasRepository = require('../repositories/reservas.repository')
const clientesRepository = require('../repositories/clientes.repository')
const estacionamentosRepository = require('../repositories/estacionamentos.repository')

class ReservasController {
    async buscaReservas(req, res) {
        const { title } = req.query
        const reservas = await reservasRepository.buscaReservas(title)
        return res.send(reservas)
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
            } = req.body

            var id = idcliente

            const buscaClientes = await clientesRepository.buscaClientes(id)

            if (!buscaClientes.length > 0) {
                return res
                    .status(400)
                    .send({ message: 'Cliente não encontrado' })
            }

            if (buscaClientes[0].status != 1) {
                return res
                    .status(400)
                    .send({ message: 'Cliente não está ativo' })
            }

            id = idestacionamento

            const buscaEstacionamentos =
                await estacionamentosRepository.buscaEstacionamentos(id)

            if (!buscaEstacionamentos.length > 0) {
                return res
                    .status(400)
                    .send({ message: 'Estacionamento não encontrado' })
            }

            if (buscaEstacionamentos[0].status != 1) {
                return res
                    .status(400)
                    .send({ message: 'O estacionamento não está ativo.' })
            }

            const buscaReservas = await reservasRepository.buscaReservas({
                idcliente,
                idestacionamento,
                datahoraentrada,
                placa,
            })

            if (buscaReservas.length > 0 && buscaReservas[0].status == 1) {
                return res.status(400).send({
                    message: 'Já existe uma reserva para este dia e horário',
                })
            }

            const dadosParaInserir = {
                idcliente: idcliente,
                idestacionamento: idestacionamento,
                datahoraentrada: datahoraentrada,
                datahorasaida: datahorasaida,
                vaga: vaga,
                placa: placa,
                status: 1,
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
        const { id } = req.body
        const dadosParaBusca = { id: id }
        const buscaReserva = await reservasRepository.buscaReservas(
            dadosParaBusca
        )
        if (buscaReserva.length <= 0) {
            return res.status(204).send({ message: 'Reserva não encontrada' })
        }

        if (buscaReserva[0].datahorasaida) {
            return res.status(400).send({
                message:
                    'Não é possível alterar a reserva com data de saída preenchida',
            })
        }

        if (buscaReserva[0].datahorasaida > new Date()) {
            return res.status(400).send({
                message: 'A data hora de saída deve estar no passado',
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
        const buscaReserva = await reservasRepository.buscaReservas(
            dadosParaBusca
        )

        if (!buscaReserva) {
            return res.status(204).send({ message: 'Reserva não encontrada' })
        }

        if (buscaReserva[0].datahorasaida) {
            return res.status(400).send({
                message:
                    'Não é possível deletar a reserva com data de saída preenchida',
            })
        }

        const dataHoraReserva = new Date(buscaReserva[0].datahoraentrada)
        const dataHoraAtual = new Date()
        const diferencaMinutos = Math.floor(
            (dataHoraReserva - dataHoraAtual) / (1000 * 60)
        )

        if (diferencaMinutos < 30) {
            return res.status(400).send({
                message:
                    'Não é possível cancelar a reserva com menos de 30 minutos de antecedência',
            })
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
