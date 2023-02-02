const express = require('express')
const { loginUser, signupUser } = require('../controllers/user.controller')

const router = express.Router()

// login
router.post('/login', loginUser)

// signup
router.post('/signup', signupUser)


module.exports = router