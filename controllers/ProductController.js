const {product} = require('./../model/product')
const APIError = require('./../error/ApiError')
const addProduct = async (req, res)=>{
   try {
    const newProduct = req.body
    console.log(newProduct)
   //  await product.create(newProduct)
   //  return res.json({status: true, msg: "you have successfully added a product"})
   } catch (error) {
        next(new APIError.internalServerError(error.message))
   }
}

module.exports = {
   addProduct
}