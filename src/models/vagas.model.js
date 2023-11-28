const { Model, DataTypes } = require('sequelize')

class Vagas extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                idestacionamento: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                vaga: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                tableName: 'vagas',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }
    static associate(models) {
        this.hasMany(models.Estacionamentos, {
            foreignKey: 'id',
            sourceKey: 'idestacionamento',
            as: 'estacionamento',
        })
        this.belongsTo(models.Reservas, {
            foreignKey: 'id',
            sourceKey: 'idvaga',
            as: 'reserva',
        })
    }
}

module.exports = Vagas
