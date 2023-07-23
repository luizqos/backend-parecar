const requireDirectory = require('require-directory')
const { Router } = require('express')
const router = new Router()

router.get('/heathcheck', (_req, res) => res.send())

const routes = requireDirectory(module, './routes')

for (const route in routes) {
    require(`./routes/${route}`)(router)
}

module.exports = router
