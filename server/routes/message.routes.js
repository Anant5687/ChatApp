const express= require('express')
const { messagePost, messageGet } = require('../controllers/message.controller')
const messageRouter = express.Router()

messageRouter.post('/message', messagePost)

messageRouter.get('/message/:conversationId',messageGet)

module.exports = messageRouter