const express = require('express')
const { signup } = require('../controllers/signup.controller')
const signUpRoute = express()
const multipart = require('connect-multiparty')
const path = require('path')
const multiPartyMiddleWare = multipart({ uploadDir: path.join(__dirname, "uploads") })

signUpRoute.post('/signup', multiPartyMiddleWare, signup)

module.exports = signUpRoute