const { Model, DataTypes } = require('sequelize')

class Clientes extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cpf: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING,
                },
                telefone: {
                    type: DataTypes.STRING,
                },
                status: {
                    type: DataTypes.INTEGER,
                },
                placa: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                tableName: 'clientes',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }

/*         static associate(models) {
            this.hasMany(models.Vendas, {
                foreignKey: 'clientes_id',
                targetKey: 'vendas',
                as: 'vendas',
            })
            this.hasMany(models.ProdutosClientes, {
                foreignKey: 'clientes_id',
                targetKey: 'produtos_clientes',
                as: 'produtos_clientes',
            })
        } */
}

module.exports = Clientes
