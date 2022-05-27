const express = require('express')

const userController = require('../Controllers/user-controller')

const router = express.Router()

router.get('/user', userController.getUsers)

router.post('/signup', userController.signUp)
router.post('/login', userController.login)

module.exports = router
