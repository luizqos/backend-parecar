const Joi = require('joi')
const validatorDoc = require('cpf-cnpj-validator')
const moment = require('moment')

const validaDocumento = (documento, tipo) => {
    const schema = Joi.string()
        .custom((value, helpers) => {
            if (
                (tipo === 'CPF' && !validatorDoc.cpf.isValid(value)) ||
                (tipo === 'CNPJ' && !validatorDoc.cnpj.isValid(value))
            ) {
                return helpers.error('any.invalid')
            }
            return value
        }, `${tipo} Validation`)
        .required()

    const { error } = schema.validate(documento)

    return error ? false : true
}

function validateInsereCliente(cliente) {
    const clienteSchema = Joi.object({
        nome: Joi.string().max(100).min(4).required(),
        email: Joi.string()
            .email()
            .max(100)
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
            .message('Email inválido')
            .required(),
        senha: Joi.string().min(4).required(),
        cpf: Joi.string().max(11).required(),
        telefone: Joi.string().length(11).required(),
        placa: Joi.string().optional().max(10).allow(null),
    })
    const validaCpf = validaDocumento(
        clienteSchema.validate(cliente.cpf).value,
        'CPF'
    )
    if (!validaCpf) {
        return validaCpf
    }
    return clienteSchema.validate(cliente)
}

function validateBuscaCliente(cliente) {
    const clienteSchema = Joi.object({
        id: Joi.number().integer().min(1),
        nome: Joi.string().max(100).min(4),
        email: Joi.string().email().max(100),
        cpf: Joi.string().max(11),
        telefone: Joi.string().max(11),
        placa: Joi.string().max(10).allow(null),
        status: Joi.number().integer().valid(0).valid(1),
    })
    return clienteSchema.validate(cliente)
}
function validateAtualizaCliente(cliente) {
    const clienteSchema = Joi.object({
        id: Joi.number().integer().min(1),
        nome: Joi.string().min(4).max(100).required(),
        email: Joi.string()
            .email()
            .max(100)
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
            .message('Email inválido')
            .required(),
        senha: Joi.string().min(4).required(),
        cpf: Joi.string().max(11).required(),
        telefone: Joi.string().length(11).required(),
        status: Joi.number().integer().valid(0).valid(1),
        placa: Joi.string().optional().max(10).allow(null),
    })
    const validaCpf = validaDocumento(
        clienteSchema.validate(cliente.cpf).value,
        'CPF'
    )
    if (!validaCpf) {
        return validaCpf
    }
    return clienteSchema.validate(cliente)
}

function validateInsereEstacionamento(estacionamento) {
    const estacionamentoSchema = Joi.object({
        nomecontato: Joi.string().max(100).min(4),
        nomefantasia: Joi.string().max(100).min(4).required(),
        email: Joi.string()
            .email()
            .max(100)
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
            .message('Email inválido')
            .required(),
        cnpj: Joi.string().max(14).required(),
        senha: Joi.string().min(4).required(),
        telefone: Joi.string().length(11).required(),
        razaosocial: Joi.string().max(100).required(),
        cep: Joi.string().optional().max(11).allow(null),
        logradouro: Joi.string().max(100),
        numero: Joi.string().max(6),
        complemento: Joi.string().max(30).optional(),
        bairro: Joi.string().max(30),
        cidade: Joi.string().max(30),
        estado: Joi.string().max(2),
        status: Joi.number().integer().valid(0).valid(1),
    })
    const validaCnpj = validaDocumento(
        estacionamentoSchema.validate(estacionamento.cnpj).value,
        'CNPJ'
    )
    if (!validaCnpj) {
        return validaCnpj
    }
    return estacionamentoSchema.validate(estacionamento)
}

function validateBuscaEstacionamento(estacionamento) {
    const estacioamentoSchema = Joi.object({
        id: Joi.number().integer().min(1),
        nomecontato: Joi.string().max(100).min(4),
        nomefantasia: Joi.string().max(100).min(4),
        email: Joi.string().email().max(100),
        telefone: Joi.string().max(11),
        cnpj: Joi.string().max(14),
        senha: Joi.string().min(4),
        razaosocial: Joi.string().max(100),
        cep: Joi.string().max(11),
        logradouro: Joi.string().max(100),
        numero: Joi.string().max(6),
        complemento: Joi.string().max(30).optional(),
        bairro: Joi.string().max(30),
        cidade: Joi.string().max(30),
        estado: Joi.string().max(2),
        status: Joi.number().integer().valid(0).valid(1),
    })
    return estacioamentoSchema.validate(estacionamento)
}

function validateAtualizaEstacionamento(estacionamento) {
    const estacionamentoSchema = Joi.object({
        id: Joi.number().integer().min(1),
        nomecontato: Joi.string().max(100).min(4),
        nomefantasia: Joi.string().max(100).min(4).required(),
        email: Joi.string()
            .email()
            .max(100)
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
            .message('Email inválido')
            .required(),
        senha: Joi.string().min(4).optional(),
        cnpj: Joi.string().max(14).required(),
        telefone: Joi.string().length(11).required(),
        razaosocial: Joi.string().max(100).required(),
        cep: Joi.string().optional().max(11).allow(null),
        logradouro: Joi.string().max(100),
        numero: Joi.string().max(6),
        complemento: Joi.string().max(30).optional(),
        bairro: Joi.string().max(30),
        cidade: Joi.string().max(30),
        estado: Joi.string().max(2),
        status: Joi.number().integer().valid(0).valid(1),
    })
    const validaCnpj = validaDocumento(
        estacionamentoSchema.validate(estacionamento.cnpj).value,
        'CNPJ'
    )
    if (!validaCnpj) {
        return validaCnpj
    }
    return estacionamentoSchema.validate(estacionamento)
}
function validateBuscaLogin(login) {
    const clienteSchema = Joi.object({
        id: Joi.number().integer().min(1),
        email: Joi.string().email().max(100),
        tipo: Joi.string().optional(),
        status: Joi.number().integer().valid(0).valid(1),
    })
    return clienteSchema.validate(login)
}
function validatebuscaReservas(reservas) {
    const reservaSchema = Joi.object({
        id: Joi.number().integer().min(1),
        idvaga: Joi.number().integer().min(1),
        idcliente: Joi.number().integer().min(1),
        entradareserva: Joi.string(),
        saidareserva: Joi.string(),
        datahoraentrada: Joi.string(),
        datahorasaida: Joi.string(),
        placa: Joi.string().max(10),
        status: Joi.number().integer().valid(0, 1),
        cliente: Joi.object({
            nome: Joi.string().max(100).min(4),
            email: Joi.string()
                .email()
                .max(100)
                .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
                .message('Email inválido'),
            telefone: Joi.string().length(11),
        }).optional(),
        vaga: Joi.object({
            idestacionamento: Joi.number().integer().min(1),
            vaga: Joi.string().max(20),
        }).optional(),
        estacionamento: Joi.object({
            nomecontato: Joi.string().max(100).min(4),
            nomefantasia: Joi.string().max(100).min(4),
            email: Joi.string()
                .email()
                .max(100)
                .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
                .message('Email inválido'),
            cnpj: Joi.string().max(14),
            telefone: Joi.string().length(11),
            razaosocial: Joi.string().max(100),
            cep: Joi.string().optional().max(11),
            logradouro: Joi.string().max(100),
            bairro: Joi.string().max(30),
            cidade: Joi.string().max(30),
            estado: Joi.string().max(2),
            status: Joi.number().integer().valid(0).valid(1),
        }).optional(),
    })
    return reservaSchema.validate(reservas)
}

function validateInsereReservas(reservas) {
    const reservaSchema = Joi.object({
        idvaga: Joi.number().integer().min(1).required(),
        idcliente: Joi.number().integer().min(1).required(),
        entradareserva: Joi.string().required(),
        saidareserva: Joi.string().required(),
        placa: Joi.string().max(10).required(),
        status: Joi.number().integer().valid(0, 1),
    })

    const { error, value } = reservaSchema.validate(reservas)

    if (error) {
        return { error: error.details[0].message }
    }
    const entrada = new Date(reservas.entradareserva)
    const saida = new Date(reservas.saidareserva)

    if (saida < entrada) {
        return {
            error: 'A data de saída não pode ser anterior à data de entrada.',
        }
    }
    const diferencaEmHoras = (saida - entrada) / (1000 * 60 * 60)
    if (diferencaEmHoras >= 24) {
        return { error: 'A reserva não pode ultrapassar 24 horas.' }
    }
    return { value }
}

function validateAtualizaReservas(reservas) {
    const reservaSchema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        datahoraentrada: Joi.string(),
        datahorasaida: Joi.string(),
        placa: Joi.string().max(10),
    })

    const { error, value } = reservaSchema.validate(reservas)

    if (error) {
        return { error: error.details[0].message }
    }
    const entrada = new Date(reservas.datahoraentrada)
    const saida = new Date(reservas.datahorasaida)

    if (saida < entrada) {
        return {
            error: 'A data de saída não pode ser anterior à data de entrada.',
        }
    }
    return { value }
}

function validateBuscaVagas(vagas) {
    const vagaSchema = Joi.object({
        id: Joi.number().integer().min(1),
        idestacionamento: Joi.number().integer().min(1),
        vaga: Joi.string().max(20),
    })
    return vagaSchema.validate(vagas)
}
function validateInsereVagas(vagas) {
    const vagaSchema = Joi.object({
        idestacionamento: Joi.number().integer().min(1),
        vaga: Joi.string().max(20),
    })
    return vagaSchema.validate(vagas)
}
function validateAtualizaVagas(vagas) {
    const vagaSchema = Joi.object({
        vaga: Joi.string().max(20),
        status: Joi.number().integer().valid(0).valid(1),
    })
    return vagaSchema.validate(vagas)
}
function validateDeleteReservas(reservas) {
    const reservasSchema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        canceladoPor: Joi.string()
            .valid('C')
            .valid('E')
            .insensitive()
            .required(),
    })
    return reservasSchema.validate(reservas)
}

function validateBuscaVagasDisponiveis(vagas) {
    const vagasSchema = Joi.object({
        entradareserva: Joi.date().min(moment().toDate()).required(),
        saidareserva: Joi.date()
            .min(Joi.ref('entradareserva'))
            .max(moment(vagas.entradareserva).endOf('day').toDate())
            .required(),
        cidade: Joi.string().max(30).required(),
        uf: Joi.string()
            .uppercase()
            .valid(
                'AC',
                'AL',
                'AP',
                'AM',
                'BA',
                'CE',
                'DF',
                'ES',
                'GO',
                'MA',
                'MT',
                'MS',
                'MG',
                'PA',
                'PB',
                'PR',
                'PE',
                'PI',
                'RJ',
                'RN',
                'RS',
                'RO',
                'RR',
                'SC',
                'SP',
                'SE',
                'TO'
            )
            .required(),
    })
    return vagasSchema.validate(vagas)
}

module.exports = {
    validateInsereCliente,
    validaDocumento,
    validateBuscaCliente,
    validateAtualizaCliente,
    validateInsereEstacionamento,
    validateBuscaEstacionamento,
    validateAtualizaEstacionamento,
    validateBuscaLogin,
    validatebuscaReservas,
    validateInsereReservas,
    validateAtualizaReservas,
    validateBuscaVagas,
    validateInsereVagas,
    validateAtualizaVagas,
    validateDeleteReservas,
    validateBuscaVagasDisponiveis,
}
