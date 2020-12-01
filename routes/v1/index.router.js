const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const IndexController = require('./../../controllers/IndexController')

 
/**
 *  @swagger
 * 
 *  /v1/common/user/me:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - index
 *      description: get user info
 *      responses:
 *        200:
 *          description: Json object containing user information
 *     
 */
router.get('/user/me', IndexController.me)
 
module.exports = router