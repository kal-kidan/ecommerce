const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const productController = require('./../../controllers/ProductController')
const cartController = require('./../../controllers/CartController')
/**
 *  @swagger
 * 
 *  /v1/customer/products:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - customer
 *      description: paginate through products
 *      parameters: 
 *        - in: query
 *          name: page
 *          schema: 
 *             type: number 
 *          required: true 
 *        - in: query
 *          name: limit
 *          schema: 
 *             type: number 
 *          required: true 
 *      responses:
 *        200:
 *          description: array of products 
 *        400: 
 *          description: invalid page and limit
 * 
 *     
 */
router.get('/products', productController.getProducts)

 /**
 *  @swagger
 * 
 *  /v1/customer/cart:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - customer
 *      description: add one or more to cart
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties: 
 *                product:
 *                  type: string
 *                  required: true 
 *                vendor:
 *                  type: string
 *                  required: true
 *                quantity:
 *                  type: number
 *                  required: true 
 *              example:
 *                  product: "product id here"
 *                  vendor: "vendor id here"
 *                  quantity: 2 
 *      responses:
 *        200:
 *          description: cart added successfuly
 *        400:
 *          description: enter valid data
 */
router.post('/cart', cartController.addToCart)
 
module.exports = router