const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const productController = require('./../../controllers/ProductController')
const cartController = require('./../../controllers/CartController');
const formValidator = require("../../middleware/form-validator");
const CartController = require("./../../controllers/CartController");
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

/**
 *  @swagger
 * 
 *  /v1/customer/cart/{_id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - customer
 *      description: delete a single cart
 *      parameters: 
 *        - in: path
 *          name: _id
 *          schema: 
 *             type: string 
 *          required: true 
 *      responses:
 *        200:
 *          description: cart deleted successfuly
 *        404: 
 *          description: cart not found
 * 
 *     
 */
router.delete('/cart/:_id', hasPermission('deleteCart'), cartController.deleteCart)

/**
 *  @swagger
 * 
 *  /v1/customer/cart/{_id}:
 *    patch:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - customer
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
 *                quantity:
 *                  type: number
 *                  required: true 
 *              example:
 *                  quantity: 3
 *      responses:
 *        200:
 *          description: you have updated successfuly
 *        400: 
 *          description: invalid quantity provided 
 *        404:
 *          description: cart not found
 * 
 *     
 */
router.patch('/cart/:_id', hasPermission('updateCart'), CartController.updateCart)
module.exports = router