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
 
router.post('/cart', cartController.addToCart)
 
module.exports = router