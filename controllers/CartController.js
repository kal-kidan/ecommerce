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

 const getCarts = async (req, res)=>{ 
    try { 
     let {_id} = req.user
     let carts = await cart.find({customer: _id}).populate({path: 'product', select: 'name price category'})
     return res.json(carts)
    } catch (error) { 
        return res.status(500).json({error: true, msg: error.messsage})
    }
 }

 module.exports = {
    addToCart,
    getCarts
 }
 