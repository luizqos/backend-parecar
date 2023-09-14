const { Model, DataTypes } = require('sequelize')

class Login extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                tipo: {
                    type: DataTypes.STRING,
                },
                documento: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING,
                },
                senha: {
                    type: DataTypes.STRING,
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
