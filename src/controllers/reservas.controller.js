const { Op, JSON } = require('sequelize')
const moment = require('moment')
const timezone = 'America/Sao_Paulo'
const format24hrs = 'DD/MM/YYYY HH:mm:ss'
const minimoCancelamento = 30 //tempo minimo para cancelamento
const reservasRepository = require('../repositories/reservas.repository')
const clientesRepository = require('../repositories/clientes.repository')
const estacionamentosRepository = require('../repositories/estacionamentos.repository')
const vagasRepository = require('../repositories/vagas.repository')
const loginRepository = require('../repositories/login.repository')
const {
    validatebuscaReservas,
    validateInsereReservas,
    validateAtualizaReservas,
    validateDeleteReservas,
} = require('../utils/validator')
const { removeAspasDuplas } = require('../utils/removeAspasDuplas')
const filtroDinamico = require('../utils/filtrosDinamicos')
const { calculaDiferenca } = require('../utils/calculaDiferenca')

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
            return res
                .status(422)
                .send({ message: filtrosValidados.error.toString() })
        }
        const {
            vaga = {},
            cliente = {},
            estacionamento = {},
            ...filtrosReservas
        } = dataRequest
        if (dataRequest.entradareserva && dataRequest.saidareserva) {
            filtrosReservas.entradareserva = {
                [Op.gte]: moment(dataRequest.entradareserva),
            }

            filtrosReservas.saidareserva = {
                [Op.lte]: moment(dataRequest.saidareserva),
            }
        } else {
            if (dataRequest.entradareserva) {
                filtrosReservas.entradareserva = moment(
                    dataRequest.entradareserva
                )
            }
            if (dataRequest.saidareserva) {
                filtrosReservas.saidareserva = moment(dataRequest.saidareserva)
            }
        }
        const filtrosBuscaReservas = {
            reserva: filtrosReservas,
            vaga: filtroDinamico(vaga),
            cliente: filtroDinamico(cliente),
            estacionamento: filtroDinamico(estacionamento),
        }
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
            const dataRequest = req.body
            const filtrosValidados = validateInsereReservas(dataRequest)
            if (filtrosValidados.error) {
                return res
                    .status(422)
                    .send({ message: filtrosValidados.error.toString() })
            }
            const { idcliente, idvaga, entradareserva, saidareserva, placa } =
                dataRequest
            const dataReserva = moment(entradareserva)
                .tz(timezone)
                .add(3, 'hours')
            const dataAtual = moment().tz(timezone)
            const diferencaEmMinutos = dataReserva.diff(dataAtual, 'minutes')

            if (diferencaEmMinutos < minimoCancelamento) {
                return res.status(400).send({
                    message: `A reserva deve ser feita com pelo menos ${minimoCancelamento} minutos de antecedência`,
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
            const dadosParaInserir = {
                idcliente,
                idvaga,
                entradareserva,
                saidareserva,
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
        const dataRequest = req.body
        const filtrosValidados = validateAtualizaReservas(dataRequest)
        if (filtrosValidados.error) {
            return res
                .status(422)
                .send({ message: filtrosValidados.error.toString() })
        }

        const { id, datahoraentrada, datahorasaida, placa } = dataRequest
        const dadosWhereBusca = {
            reserva: { id: id },
        }

        const buscaReserva = await reservasRepository.buscaReservas(
            dadosWhereBusca
        )

        if (!buscaReserva.length) {
            return res.status(204).send({ message: 'Reserva não encontrada' })
        }

        if (
            !!datahorasaida &&
            !datahoraentrada &&
            !buscaReserva[0].datahoraentrada
        ) {
            return res
                .status(400)
                .send({ message: 'A entrada do cliente deve ser preenchida.' })
        }

        if (datahoraentrada) {
            const diferencaEntrada = calculaDiferenca(
                datahoraentrada,
                buscaReserva[0].entradareserva
            )
            if (diferencaEntrada < -120 || diferencaEntrada > 120) {
                return res.status(400).send({
                    message: 'A entrada do cliente está fora da data agendada.',
                })
            }
        }

        if (datahorasaida) {
            const diferencaSaida = calculaDiferenca(
                datahorasaida,
                buscaReserva[0].saidareserva
            )
            if (diferencaSaida < 0 || diferencaSaida > 600) {
                return res.status(400).send({
                    message: 'A saída do cliente está fora da data agendada.',
                })
            }
        }

        if (buscaReserva[0].datahorasaida && datahorasaida) {
            return res.status(400).send({
                message:
                    'Não é possível alterar a reserva com data de saída preenchida',
            })
        }

        const dadosParaAtualizar = { datahoraentrada, datahorasaida, placa }
        const dadosParaBusca = { id: id }
        if (buscaReserva[0].datahoraentrada) {
            delete dadosParaAtualizar.datahoraentrada
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
        const dataRequest = req.body
        const filtrosValidados = validateDeleteReservas(dataRequest)
        if (filtrosValidados.error) {
            return res
                .status(422)
                .send({ message: filtrosValidados.error.toString() })
        }
        const { id, canceladoPor } = dataRequest
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

        const dataHoraReserva = moment(buscaReserva[0].entradareserva)
            .tz(timezone)
            .add(3, 'hours')

        const dataHoraAtual = moment().tz(timezone)
        const diferencaMinutos = dataHoraReserva.diff(dataHoraAtual, 'minutes')
        if (diferencaMinutos < 30) {
            return res.status(400).send({
                message:
                    'Não é possível cancelar a reserva com menos de 30 minutos de antecedência',
            })
        }
        const { razaosocial } = buscaReserva[0].vaga.estacionamento
        const dadosParaAtualizar = { status: 0 }
        if (buscaReserva[0].status !== 0) {
            await reservasRepository.atualizaReserva(
                dadosParaAtualizar,
                dadosParaBusca
            )
        }
        const emailCancelamento =
            canceladoPor === 'C'
                ? buscaReserva[0].vaga.estacionamento.email
                : buscaReserva[0].cliente.email

        const dados = {
            nome: buscaReserva[0].cliente.nome,
            dataReserva: moment(dataHoraReserva)
                .tz(timezone)
                .format(format24hrs),
            numeroReserva: buscaReserva[0].id,
            localReserva: razaosocial,
            canceladoPor,
        }
        const conteudo = templatecancelaReserva(dados)
        enviaEmail(emailCancelamento, assunto, conteudo)
        return res
            .status(200)
            .send({ message: 'A reserva foi cancelada com sucesso' })
    }
}
module.exports = new ReservasController()
