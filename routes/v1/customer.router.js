const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const productController = require('./../../controllers/ProductController')
const cartController = require('./../../controllers/CartController');
const formValidator = require("../../middleware/form-validator");
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
 *                carts:
 *                  type: array
 *                  required: true
 *                  items:
 *                    type: object
 *                    required: true
 *                    properties:
 *                      product:
 *                        type: string
 *                        required: true 
 *                      vendor:
 *                        type: string
 *                        required: true 
 *                      quantity:
 *                        type: number
 *                        required: true 
 *      responses:
 *        200:
 *          description: cart added successfuly
 *        400:
 *          description: enter valid data
 */
router.post('/cart', hasPermission('addToCart'), formValidator.validateCart, cartController.addToCart)


/**
 *  @swagger
 * 
 *  /v1/customer/carts:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - customer
 *      description: fetch carts
 *      responses:
 *        200:
 *          description: an array of items in the cart
 *     
 */
router.get('/carts', hasPermission('getCarts'), cartController.getCarts)
module.exports = router