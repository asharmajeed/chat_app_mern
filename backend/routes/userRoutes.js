const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const getUserForSidebar = require('../controllers/userController')

const router = express.Router()

// router.use(requireAuth)

router.get('/', requireAuth, getUserForSidebar)

module.exports = router