const { Router } = require('express')
const auth = require('../routes/auth')
const api = Router()

api.use('/auth', auth)

module.exports = api
