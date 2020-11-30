const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const IndexController = require('./../../controllers/IndexController')
const MigrationController = require('./../../controllers/MigrationController')
 
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


/**
 *  @swagger
 * 
 *  /v1/common/migrate:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - index
 *      description: data migration
 *      responses:
 *        200:
 *          description: data migrated successfuly
 */
router.post('/migrate', MigrationController.migrate)
router.get('/notification',  (req, res)=>{
    res.render('index')
})
module.exports = router