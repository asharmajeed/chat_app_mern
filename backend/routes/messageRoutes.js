const express = require('express')
const { sendMessage, getMessages } = require('../controllers/messageController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireAuth)

router.get('/:id', requireAuth, getMessages)

router.post('/send/:id', requireAuth, sendMessage)

module.exports = router