require('dotenv').config()
const https = require('https')
const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const database = require('./models')
const port = process.env.PORT
const router = require('./router')

const corsOptions = {
    origin: 'http://localhost:8081',
}

database
    .sync()
    .then(() => console.log('Synchronized database'))
    .catch((err) => console.log(`Failed to connect to database: ${err.message}`))

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

if (process.env.RUNNING === 'LOCAL') {
    app.listen(port, () =>
        console.log(`Server is running on port ${port}.`)
    )
} else {
    const credentials = {
        key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
        cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
    }
    const server = https.createServer(credentials, app)
    server.listen(port, () =>
        console.log(`Server is running on port ${port}.`)
    )
}
