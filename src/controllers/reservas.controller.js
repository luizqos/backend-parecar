
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
        const reserva = await reservasRepository.buscaReservasPorId(dadosWhere)
        return res.send(reserva)
    }

    async insereReserva(req, res) {
        try {
            const { idcliente, idestacionamento, datahoraentrada, datahorasaida, vaga, placa, status } = req.body
            //Validar se já existe uma reserva para determinada placa em um mesmo dia e horário
            const dadosParaInserir = {
                idcliente: idcliente,
                idestacionamento: idestacionamento,
                datahoraentrada: datahoraentrada,
                datahorasaida: datahorasaida,
                vaga: vaga,
                placa: placa,
                status: status
            }
            const reserva = await reservasRepository.insereReserva(dadosParaInserir)
            return res.send(reserva)
        }
        catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

}

module.exports = new ReservasController()
