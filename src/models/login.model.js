const { Model, DataTypes } = require('sequelize')

class Login extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                tipo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                usuario: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                senha: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                dataultimologin: {
                    type: DataTypes.DATE,
                },
                status: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                tableName: 'login',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }
}

module.exports = Login
