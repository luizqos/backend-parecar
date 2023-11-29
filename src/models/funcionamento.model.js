const { Model, DataTypes } = require('sequelize')

class Funcionamento extends Model {
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
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                dia: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                abertura: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                fechamento: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'funcionamento',
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
        })
    }
}

module.exports = Funcionamento
