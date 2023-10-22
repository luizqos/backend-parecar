const moment = require('moment')
const timezone = 'America/Sao_Paulo'
const format24hrs = 'DD/MM/YYYY HH:mm:ss'
const minimoCancelamento = 30 //tempo minimo para cancelamento
const reservasRepository = require('../repositories/reservas.repository')
const clientesRepository = require('../repositories/clientes.repository')
const estacionamentosRepository = require('../repositories/estacionamentos.repository')
const loginRepository = require('../repositories/login.repository')
const { validatebuscaReservas } = require('../utils/validator')
const { removeAspasDuplas } = require('../utils/removeAspasDuplas')
const filtroDinamico = require('../utils/filtrosDinamicos')

const enviaEmail = require('../utils/enviaEmail')
const {
    templatecancelaReserva,
    assunto,
} = require('../templates/cancelaReserva')

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
            const {
                idcliente,
                idestacionamento,
                datahoraentrada,
                vaga,
                placa,
            } = req.body
            const dataReserva = moment(datahoraentrada)
                .tz(timezone)
                .add(3, 'hours')
            const dataAtual = moment().tz(timezone)
            const diferencaEmMinutos = dataReserva.diff(dataAtual, 'minutes')

            if (diferencaEmMinutos < minimoCancelamento) {
                return res.status(400).send({
                    message: `A reserva deve ser feita com pelo menos ${minimoCancelamento} minutos de antecedência`,
                })
            }
            const dadosParaBusca = { placa, datahoraentrada }
            const buscaReserva = await reservasRepository.buscaReservas(
                dadosParaBusca
            )
            if (buscaReserva[0]?.status) {
                return res.status(400).send({
                    message: 'Já existe uma reserva para este dia e horário',
                })
            }
            const dadosBuscaCliente = { id: idcliente }

            const buscaClientes = await clientesRepository.buscaClientes(
                dadosBuscaCliente
            )

            if (!buscaClientes.length || !buscaClientes[0].status) {
                return res.status(400).send({
                    message: !buscaClientes.length
                        ? 'Cliente não encontrado'
                        : 'Cliente não está ativo',
                })
            }

            const dadosBuscaEstacionamento = { id: idestacionamento }
            const buscaEstacionamentos =
                await estacionamentosRepository.buscaEstacionamentos(
                    dadosBuscaEstacionamento
                )

            if (
                !buscaEstacionamentos.length ||
                !buscaEstacionamentos[0].status
            ) {
                return res.status(400).send({
                    message: !buscaEstacionamentos.length
                        ? 'Estacionamento não encontrado'
                        : 'O estacionamento não está ativo.',
                })
            }

            const dadosParaInserir = {
                idcliente,
                idestacionamento,
                datahoraentrada,
                vaga,
                placa,
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
        //const result = validateatualizaReserva(req.body) //todo fazer esse validate
        const result = req.body
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
        const { canceladoPor } = req.body //O id de login de quem cancelou
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

        const dataHoraReserva = moment(buscaReserva[0].datahoraentrada)
            .tz(timezone)
            .format()
        const dataHoraAtual = moment().tz(timezone).format()
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
        const filtrosBuscaLogin =
            canceladoPor === 'C'
                ? { tipo: 'E', id: buscaReserva[0].idestacionamento }
                : { tipo: 'C', id: buscaReserva[0].idcliente }

        const dadosLogin = await loginRepository.buscaLogin(filtrosBuscaLogin)
        if (!dadosLogin.length) {
            return res
                .status(400)
                .json({ message: 'Não foi encontrado nenhum registro' })
        }
        const dadosCliente = await clientesRepository.buscaClientes({
            id: buscaReserva[0].idcliente,
        })
        const dadosEstacionamento =
            await estacionamentosRepository.buscaEstacionamentos({
                id: buscaReserva[0].idestacionamento,
            })
        const dados = {
            nome: dadosCliente[0].nome,
            dataReserva: moment(dataHoraReserva)
                .tz(timezone)
                .format(format24hrs),
            numeroReserva: buscaReserva[0].id,
            localReserva: dadosEstacionamento[0].razaosocial,
            canceladoPor,
        }
        const conteudo = templatecancelaReserva(dados)
        const emailCancelamento = dadosLogin[0].email
        enviaEmail(emailCancelamento, assunto, conteudo)
        return res
            .status(200)
            .send({ message: 'A reserva foi cancelada com sucesso' })
    }
}
module.exports = new ReservasController()
