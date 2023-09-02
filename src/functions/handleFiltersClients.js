const { Op } = require('sequelize')

const lidarFiltrosClientes = (filtros) => {
    if (filtros.nome) {
        filtros.nome = {
            [Op.like]: `%${filtros.nome}%`,
        }
    }

    return filtros
}

module.exports = lidarFiltrosClientes
