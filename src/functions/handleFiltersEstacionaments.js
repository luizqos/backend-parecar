const { Op } = require('sequelize')

const lidarFiltrosEstacionamentos = (filtros) => {
    if (filtros.nome) {
        filtros.nome = {
            [Op.like]: `%${filtros.nome}%`,
        }
    }

    return filtros
}

module.exports = lidarFiltrosEstacionamentos
