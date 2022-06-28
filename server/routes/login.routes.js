const express = require('express')
const { login , getLoginData, getLoginDataByQuery} = require('../controllers/login.controller')
const loginUpRoute = express()

loginUpRoute.post('/login',login )

loginUpRoute.get('/data',getLoginData)

loginUpRoute.get('/api/user',getLoginDataByQuery )

module.exports = loginUpRoute

