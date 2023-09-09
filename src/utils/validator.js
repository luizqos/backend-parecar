const Joi = require('joi')
const cpfValidator = require('cpf-cnpj-validator')

const validateCPF = (cpf) => {
    const schema = Joi.string()
        .custom((value, helpers) => {
            if (!cpfValidator.cpf.isValid(value)) {
                return helpers.error('any.invalid')
            }
            return value
        }, 'CPF Validation')
        .required()

    const { error } = schema.validate(cpf)

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
        cpf: Joi.string().max(11).required(),
        telefone: Joi.string().length(11).required(),
        placa: Joi.string().optional().max(10).allow(null),
    })
    const validaCpf = validateCPF(clienteSchema.validate(cliente.cpf).value)
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
module.exports = { validateInsereCliente, validateCPF, validateBuscaCliente }
