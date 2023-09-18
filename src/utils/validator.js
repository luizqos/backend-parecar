const Joi = require('joi')
const validatorDoc = require('cpf-cnpj-validator')

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
        complemento: Joi.string().max(30),
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
        senha: Joi.string().min(4).required(),
        razaosocial: Joi.string().max(100),
        cep: Joi.string().max(11),
        logradouro: Joi.string().max(100),
        numero: Joi.string().max(6),
        complemento: Joi.string().max(30),
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
        cnpj: Joi.string().max(14).required(),
        telefone: Joi.string().length(11).required(),
        razaosocial: Joi.string().max(100).required(),
        cep: Joi.string().optional().max(11).allow(null),
        logradouro: Joi.string().max(100),
        numero: Joi.string().max(6),
        complemento: Joi.string().max(30),
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
module.exports = {
    validateInsereCliente,
    validaDocumento,
    validateBuscaCliente,
    validateAtualizaCliente,
    validateInsereEstacionamento,
    validateBuscaEstacionamento,
    validateAtualizaEstacionamento,
}
