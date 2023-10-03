const { Model, DataTypes } = require('sequelize')

class Estacionamentos extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                nomecontato: {
                    type: DataTypes.STRING,
                },
                razaosocial: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                nomefantasia: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cnpj: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                telefone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cep: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                logradouro: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                numero: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                complemento: {
                    type: DataTypes.STRING,
                },
                bairro: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cidade: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                estado: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                tableName: 'estacionamentos',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Reservas, {
            foreignKey: 'id',
            as: 'reserva',
        })
    }
}

module.exports = Estacionamentos
