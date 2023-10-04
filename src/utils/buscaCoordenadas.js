const axios = require('axios')
async function buscaCoordenada(endereco) {
    const apiKey = process.env.API_KEY_GOOGLE

    const { data } = await axios.get(process.env.URL_API_MAPS, {
        params: {
            address: endereco,
            key: apiKey,
        },
    })
    if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location
        const coordenadas = { latitude: lat, longitude: lng }
        return coordenadas
    }
    return false
}
module.exports = {
    buscaCoordenada,
}
