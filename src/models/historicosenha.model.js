const { Model, DataTypes } = require('sequelize')

class HistoricoSenha extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                idlogin: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                tipo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                link: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                senha: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.TIME,
                    allowNull: false,
                    field: 'createdat',
                },
                updatedAt: {
                    type: DataTypes.TIME,
                    allowNull: true,
                    field: 'updatedat',
                },
            },
            {
                sequelize,
                tableName: 'historicosenha',
                timestamps: true,
                createdAt: true,
                updatedAt: false,
            }
        )
    }
}

module.exports = HistoricoSenha
