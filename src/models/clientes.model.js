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

}

module.exports = Clientes
