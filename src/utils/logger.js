const { createLogger, format, transports } = require('winston')
const moment = require('moment')
const timezone = 'America/Sao_Paulo'
const format24hrs = 'DD/MM/YYYY HH:mm:ss'
const logger = createLogger({
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.printf(
            (info) =>
                `[${(info.timestamp = moment()
                    .tz(timezone)
                    .format(format24hrs))}] ${info.level} ${info.message}`
        )
    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 10,
            filename: `${__dirname}/../logs/all.log`,
            level: 'debug',
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 10,
            filename: `${__dirname}/../logs/error.log`,
            level: 'error',
        }),
    ],
})

module.exports = logger
