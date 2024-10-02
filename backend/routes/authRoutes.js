const express = require('express')
const { loginUser, signupUser, logoutUser } = require('../controllers/authController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// logout route
router.post('/logout', logoutUser)

module.exports = router