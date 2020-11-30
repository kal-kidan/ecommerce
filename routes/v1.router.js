const express = require('express')
const router = express.Router()

const authRoute = require('./v1/auth.router')
const indexRoute = require('./v1/index.router') 
 

router.use('/common', indexRoute) 
router.use('/auth', authRoute)
 

module.exports = router