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
