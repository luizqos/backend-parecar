const moment = require('moment')
const timezone = 'America/Sao_Paulo'
function calculaDiferenca(data1, data2) {
    console.log(data1, data2)
    return moment(data1)
        .tz(timezone)
        .add(3, 'hours')
        .diff(moment(data2).tz(timezone), 'minutes')
}
module.exports = { calculaDiferenca }
