const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const ProductController = require('./../../controllers/ProductController')

 
/**
 *  @swagger
 * 
 *  /v1/vendor/product:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - vendor
 *      description: add product
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties: 
 *                name:
 *                  type: string
 *                  required: true 
 *                price:
 *                  type: number
 *                  required: true
 *                description:
 *                  type: string
 *                  required: true 
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties: 
 *                image:
 *                  type: string
 *                  format: binary
 *                  required: true 
 *      responses:
 *        200:
 *          description: Json object containing user information
 *     
 */
router.post('/product', hasPermission('addProduct'), ProductController.addProduct)
 
module.exports = router