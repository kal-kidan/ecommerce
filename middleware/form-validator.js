const validationSchema = require('./../lib/validation-schemas')
const {registrationSchema} = validationSchema
const {productSchema} = validationSchema 
const {productUpdateSchema} = validationSchema 

const Joi = require('joi')

const validateRegistration = async (req, res, next)=>{
  if(Object.entries(req.body).length=== 0){ 
    return res.json({error:true, msg: "please enter a value"})
  } 
  let validationResult;
  try {
    if(req.body.role == "customer" || req.body.role == "vendor"){
      validationResult = await registrationSchema.validateAsync(req.body)
      next()
    }
    else{
      return res.json({error:true, msg: "role can only be customer"})
    }
      
    }
    catch (err) {  
      let msg = err.message.replace(/"/g, '')
      return res.json({error: true, msg})
    }
       
}

const validateProduct = async (req, res, next)=>{
  if(Object.entries(req.body).length=== 0){ 
    return res.json({error:true, msg: "please enter a value"})
  } 
  try {
     await productUpdateSchema.validateAsync(req.body)
     next() 
    }
    catch (err) {  
      let msg = err.message.replace(/"/g, '')
      return res.json({error: true,  msg})
    }
       
}

const validateUpdateProduct = async (req, res, next)=>{
  if(Object.entries(req.body).length=== 0){ 
    return res.json({error:true, msg: "please enter a value"})
  } 
  try {
     await productSchema.validateAsync(req.body)
     next() 
    }
    catch (err) {  
      let msg = err.message.replace(/"/g, '')
      return res.json({error: true,  msg})
    }
       
} 

module.exports = {
  validateRegistration,
  validateUpdateProduct,
  validateProduct
}
