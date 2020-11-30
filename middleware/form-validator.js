const validationSchema = require('./../lib/validation-schemas')
const {registrationSchema} = validationSchema

const Joi = require('joi')

const validateRegistration = async (req, res, next)=>{
  if(Object.entries(req.body).length=== 0){ 
    return res.json({error:true, msg: "please enter a value"})
  } 
  let validationResult;
  try {
    if(req.body.role == "customer"){
      validationResult = await registrationSchema.validateAsync(req.body)
      next()
    }
    else{
      return res.json({error:true, msg: "role can only be customer"})
    }
      
    }
    catch (err) { 
      console.log(err);
      return res.json({error: true, message: err.message})
    }
       
}

 
 

module.exports = {
  validateRegistration 
}
