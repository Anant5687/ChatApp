const express = require('express')
const { conversationPost, conversationGet } = require('../controllers/conversation.controller')
const converSationRouter = express.Router()

//Making Chats
converSationRouter.post('/', conversationPost)

//Getting chats
converSationRouter.get('/:userId', conversationGet)

module.exports = converSationRouter