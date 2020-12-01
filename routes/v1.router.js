const express = require('express')
const router = express.Router()

const authRoute = require('./v1/auth.router')
const indexRoute = require('./v1/index.router') 
const vendorRoute = require('./v1/vendor.router')
const customerRoute = require('./v1/customer.router')

router.use('/common', indexRoute) 
router.use('/auth', authRoute)
router.use('/vendor', vendorRoute)
router.use('/customer', customerRoute)

module.exports = router