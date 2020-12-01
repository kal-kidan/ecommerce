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

 const deleteCart = async (req, res, next)=>{ 
    try { 
     let {_id} = req.params
     let carT = await cart.findOneAndRemove({_id,  customer: req.user._id}, {useFindAndModify: false})
     if(!carT){
       return res.status(404).json({error: true, msg: `cart with id ${_id} is not found`})
     }
     return res.json({status: true, msg: `the cart is deleted successfuly`})
    } catch (error) { 
        return res.status(400).json({error: true, msg:"please enter valid id"})
    }
 }
 
 const updateCart = async (req, res, next)=>{ 
   try { 
    let {_id} = req.params
    let {quantity} = req.body
    if(!quantity>0){
        return res.status(400).json({error: true, msg: 'please enter valid quantity'})
    }
    let carT = await cart.findOneAndUpdate({_id, customer: req.user._id}, {quantity}, {useFindAndModify: false})
    if(!carT){
      return res.status(404).json({error: true, msg: `cart with id of ${_id} is not found`})
    }
    return res.json({status: true, msg: `you have updated cart quantity successfuly`})
   } catch (error) { 
       return res.status(400).json({error: true, msg:"please enter valid id"})
   }
 }

 
 module.exports = {
    addToCart,
    deleteCart,
    getCarts,
    updateCart
 }
 