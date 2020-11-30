const jwt = require('jsonwebtoken')
const { validationResult} = require('express-validator')
const User = require('./../model/user').user
const signUp = async (req, res)=>{ 
    
  try {
    let user = new User (req.body)
    user = await user.save()
    let token = await user.getAuthToken()
    res.json({user, token})
  } catch (error) { 
    if(error.keyValue){
        if(error.keyValue.email){   
           return res.status(400).json({error: true, msg: "the email is taken"})
        }
         
    }
      return res.status(400).json({
          error: true,
          message: error.message
      })
  }
}

const signIn = async (req, res)=>{
    try {
        let user = await User.findByCredentials(req.body.email, req.body.password) 
         let errors={msg:''}
         if(user._id ){
             let status = true
             const token = await user.getAuthToken() 
             return  res.json({user, token, status})
         }
         else{
             let status = false 
              return res.status(400).json({error:true, status,msg: "incorrect password or username"})
         }
    
     } catch (error) { 
         return res.status(500).json({
             errors:{
                 error:true,
                 msg: error.message
             }
           })
     }    
}
module.exports = {
    signUp,
    signIn
}