const clientes = require('../models/clientes.model')
const { Op } = require('sequelize')

class ClientesRepository {
    async buscaTodosClientes(title) {
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await clientes.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaCliente(dadosWhere) {
        try {
            return await clientes.findOne({ where: dadosWhere })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaClientePorId(filtrosWhere) {
        try {
            return await clientes.findOne({
                where: filtrosWhere,
                include: [
                    {
                        model: vendas,
                        as: 'vendas',
                        required: true,
                        order: [['dataVenda', 'DESC']],
                        limit: 50,
                        attributes: {
                            exclude: ['lancamentos_id', 'clientes_id'],
                        },
                        include: {
                            model: lancamentos,
                            as: 'lancamentos',
                            required: true,
                            attributes: {
                                exclude: ['vendas_id'],
                            },
                        },
                    },
                    {
                        model: produtosCliente,
                        as: 'produtos_clientes',
                        required: true,
                        attributes: {
                            exclude: ['idProdutosClientes', 'clientes_id'],
                        },
                        include: {
                            model: produtos,
                            as: 'produto',
                            required: true,
                            attributes: {
                                exclude: [
                                    'precoCompra',
                                    'unidade',
                                    'descricao',
                                ],
                            },
                        },
                    },
                ],
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ClientesRepository()
