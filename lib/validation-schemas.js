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

module.exports = {
  registrationSchema
}

 