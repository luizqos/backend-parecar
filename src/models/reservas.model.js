const { Model, DataTypes } = require('sequelize')


class Reservas extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                idcliente: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                idestacionamento: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                datahoraentrada: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                datahorasaida: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                vaga: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                placa: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'reservas',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }


}

module.exports = Reservas