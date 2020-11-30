const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const authController = require('./../../controllers/AuthController')
 
const formValidator = require('./../../middleware/form-validator')
/**
 *  @swagger
 * 
 *  /v1/auth/signup:
 *    post:
 *      tags:
 *        - auth
 *      security:
 *        - bearerAuth: []
 *      description: user registration (user, admin)
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content: 
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string 
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string 
 *                gender:
 *                  type: string 
 *                phoneNumber:
 *                  type: string 
 *                password:
 *                  type: string 
 *                role:
 *                  type: string  
 *              example:
 *                  firstName: "abebe"
 *                  lastName: "kebede"
 *                  email: "abebe@gmail.com"
 *                  gender: "male"
 *                  password: "password"
 *                  phoneNumber: "+251942793296"
 *                  role: "customer"  
 *      responses:
 *        200:
 *          description:  A JSON object containing user information
 *        401: 
 *          description: incorrect username or password 
 *  
 *     
 */

router.post('/signup', formValidator.validateRegistration, authController.signUp)


/**
 *  @swagger
 * 
 *  /v1/auth/signin:
 *    post:
 *      tags:
 *        - auth
 *      description: login
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content: 
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string 
 *                password:
 *                  type: string
 *              example:
 *                email: abebe@gmail.com
 *                pasword: abebe1             
 *      responses:
 *        200:
 *          description:  A JSON object containing user information
 *        401: 
 *          description: incorrect username or password 
 *  
 *     
 */
router.post('/signin', authController.signIn)
 
 
module.exports = router