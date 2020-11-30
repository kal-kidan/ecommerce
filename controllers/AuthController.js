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
      console.log(error)
      res.json({
          error: true,
          message: error.message
      })
  }
}

const signIn = async (req, res)=>{
    const {email} = req.body
    const {password} = req.body
    const user = await User.findByCredentials(email, password)
    if(!user){
        return res.status(401).json({error: true, message: "incorrect username or password"})
    }
    const token = await user.getAuthToken()
    return res.json({status: true, user, token})
  
}
module.exports = {
    signUp,
    signIn
}