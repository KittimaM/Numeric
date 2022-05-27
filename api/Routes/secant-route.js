const express = require('express')
const rq_controller = require('../Controllers/secant-controller')
const { requireLogin } = require('../Controllers/user-controller')
const router = express.Router()

router.get('/get' ,requireLogin, rq_controller.rq_get)

router.post('/post' , rq_controller.rq_post)

module.exports = router