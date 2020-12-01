const Joi = require('joi')
const registrationSchema =  Joi.object({
  firstName: Joi.string().alphanum().max(100).required(),
  lastName: Joi.string().alphanum().max(100).required(),
  email: Joi.string().email().max(350).required(),
  gender: Joi.string().alphanum().max(6).required(),
  phoneNumber: Joi.string().max(20).required() , 
  password: Joi.string().min(6).max(50).required(),
  role: Joi.string().required()
})

const productSchema =  Joi.object({
  name: Joi.string().max(100).required(),
  price: Joi.number().max(100).required(), 
  description: Joi.string().max(300).required(),
  category: Joi.string().max(100).required()
})


const productUpdateSchema =  Joi.object({
  name: Joi.string().max(100),
  price: Joi.number().max(100), 
  description: Joi.string().max(300),
  category: Joi.string().max(100)
}).required()

const cartSchema =  Joi.array().items(
  Joi.object({
    product: Joi.string().max(100),
    vendor: Joi.number().max(100), 
    quantity: Joi.number().min(1) 
  }).required()
).required()
module.exports = {
  registrationSchema,
  productUpdateSchema,
  productSchema,
  cartSchema
}

 