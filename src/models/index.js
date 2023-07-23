const Sequelize = require('sequelize')
const requireDirectory = require('require-directory')
const configDatabse = require('../config/database.config.js')

const connection = new Sequelize(configDatabse)
const models = requireDirectory(module, './', { exclude: 'index.js' })

for (const model in models) {
    models[model].init(connection)
}

for (const model in models) {
    models[model].associate?.(connection.models)
}

module.exports = connection
