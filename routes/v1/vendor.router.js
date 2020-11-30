const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const ProductController = require('./../../controllers/ProductController')
const formValidator = require('./../../middleware/form-validator')
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
 *              example:
 *                  name: "keyboard"
 *                  price: 56
 *                  description: "keyboard description"
 *                  category: "electronics"
 *      responses:
 *        200:
 *          description: Json object containing user information
 *     
 */
router.post('/product', hasPermission('addProduct'), formValidator.validateProduct, ProductController.addProduct)

/**
 *  @swagger
 * 
 *  /v1/vendor/product-image/{_id}:
 *    patch:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - vendor
 *      description: upload product image
 *      parameters: 
 *        - in: path
 *          name: _id
 *          schema: 
 *             type: string 
 *          required: true 
 *      requestBody:
 *        content: 
 *          multipart/form-data:  
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: file 
 *                  required: true
 *      responses:
 *        200:
 *          description: product image uploaded successfuly 
 *        400: 
 *          description: invalid file format  
 * 
 *     
 */
router.patch('/product-image/:_id', hasPermission('uploadProductImage'), ProductController.uploadProductImage)
 
module.exports = router