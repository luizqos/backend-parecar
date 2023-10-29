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
                idvaga: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                entradareserva: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                saidareserva: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                datahoraentrada: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                datahorasaida: {
                    type: DataTypes.DATE,
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
    static associate(models) {
        this.hasMany(models.Clientes, {
            foreignKey: 'id',
            sourceKey: 'idcliente',
            as: 'cliente',
        })
        this.hasMany(models.Vagas, {
            foreignKey: 'id',
            sourceKey: 'idvaga',
            as: 'vaga',
        })
    }
}

module.exports = Reservas
