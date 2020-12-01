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

/**
 *  @swagger
 * 
 *  /v1/vendor/product/{_id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - vendor
 *      description: get a single product  
 *      parameters: 
 *        - in: path
 *          name: _id
 *          schema: 
 *             type: string 
 *          required: true 
 *      responses:
 *        200:
 *          description: JSON object containing product detail
 *        404: 
 *          description: product not found
 * 
 *     
 */
router.get('/product/:_id',  ProductController.getProduct)

/**
 *  @swagger
 * 
 *  /v1/vendor/product/{_id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - vendor
 *      description: delete a product
 *      parameters: 
 *        - in: path
 *          name: _id
 *          schema: 
 *             type: string 
 *          required: true 
 *      responses:
 *        200:
 *          description: product deleted successfuly
 *        404: 
 *          description: product not found
 * 
 *     
 */
router.delete('/product/:_id', hasPermission('deleteProduct'), ProductController.deleteProduct)

/**
 *  @swagger
 * 
 *  /v1/vendor/product/{_id}:
 *    patch:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - vendor
 *      description: update any of product fields
 *      parameters: 
 *        - in: path
 *          name: _id
 *          schema: 
 *             type: string 
 *          required: true 
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
 *          description: you have updated successfuly
 *        400: 
 *          description: invalid data provided 
 *        404:
 *          description: product not found
 * 
 *     
 */
router.patch('/product/:_id', hasPermission('updateProduct'), formValidator.validateUpdateProduct, ProductController.updateProduct)
module.exports = router