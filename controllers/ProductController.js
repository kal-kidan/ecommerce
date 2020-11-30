const {product} = require('./../model/product') 

const addProduct = async (req, res, next)=>{ 
 
   // res.send(req.body)
  
   try { 
    let newProduct = req.body
    newProduct.vendor = req.user._id
    await product.create(newProduct)
    return res.json({status: true, msg: "you have successfully added a product"})
   } catch (error) { 
       return res.status(500).json({error: true, msg: error.message})
   }
}

module.exports = {
   addProduct
}