const {cart} = require('./../model/cart') 
const addToCart = async (req, res, next)=>{ 
    try { 
     let carts = req.body.carts
     carts = carts.map((item)=>{
         item.customer = req.user._id
         return item
     }) 
     await cart.insertMany(carts)
     return res.json({status: true, msg: "you have successfully added items to the cart"})
    } catch (error) { 
        return res.status(400).json({error: true, msg: "please enter valid id, product id must be unique"})
    }
 }

 module.exports = {
    addToCart
 }
 