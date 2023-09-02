const Joi = require('joi'); 
const cpfValidator = require('cpf-cnpj-validator'); 

const validateCPF = (cpf) => {
    const schema = Joi.string().custom((value, helpers) => {
      if (!cpfValidator.cpf.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'CPF Validation').required();
  
    const { error } = schema.validate(cpf);
  
    return error ? false : true;
  };


function validateCliente(cliente) {
    const clienteSchema = Joi.object({
        nome: Joi.string().max(50).min(4),
        email: Joi.string().email().max(50).required(),
        cpf: Joi.string().max(14).required(),
        telefone: Joi.string().max(15),
        placa: Joi.string().max(15).allow(null)
    });
    const validaCpf = validateCPF(clienteSchema.validate(cliente.cpf).value)
        if(!validaCpf){
            return validaCpf;
        }
    return clienteSchema.validate(cliente);
}
module.exports = {validateCliente, validateCPF};




const Joi = require('joi');
const cnpjValidator = require('cpf-cnpj-validator');

const validateCNPJ = (cnpj) => {
  if (!cnpjValidator.cnpj.isValid(cnpj)) {
    return false;
  }
  return true;
};

const estacionamentoSchema = Joi.object({
  cnpj: Joi.string().max(14).custom((value, helpers) => {
    if (!validateCNPJ(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'CNPJ Validation').required(),
  nomeContato: Joi.string().max(100).min(4).required(),
  razaoSocial: Joi.string().max(100).required(),
  nomeFantasia: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  telefone: Joi.string().max(11).required(),
  cep: Joi.string().max(11).required(),
  logradouro: Joi.string().max(100).required(),
  numero: Joi.string().max(6).required(),
  complemento: Joi.string().max(30).allow(null).optional(),
  bairro: Joi.string().max(30).required(),
  cidade: Joi.string().max(30).required(),
  estado: Joi.string().max(14).required(),
});

function validateEstacioamento(Estacionamento) {
  const { error } = EstacionamentoSchemaSchema.validate(Estacionamento);

  if (error) {
    return false;
  }

  return true;
}

module.exports = { validateEstacioamento, validateCNPJ };
