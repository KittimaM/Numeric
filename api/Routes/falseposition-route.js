const express = require('express')
const rq_controller = require('../Controllers/falseposition-controller')
const router = express.Router()
const { requireLogin } = require('../Controllers/user-controller')

router.get('/get',requireLogin,rq_controller.rq_get)
router.post('/post',rq_controller.rq_post)

module.exports = router