const { Op } = require('sequelize')

const filtroDinamico = (filtros) => {
    if (filtros.nome) {
        filtros.nome = {
            [Op.like]: `%${filtros.nome}%`,
        }
    }

    return filtros
}

module.exports = filtroDinamico
