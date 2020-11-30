const jwt = require('jsonwebtoken')
const {user} = require('../model/user')
//require('dotenv').config({path: './../.env'})
const TOKEN_KEY = process.env.TOKEN_KEY
const auth = async (req, res, next) => {
    try {
         const token = req.header('Authorization').replace('Bearer ', '') 
         const decoded = jwt.verify(token, TOKEN_KEY)  
         const {_id} = decoded 
         const User = await user.findOne({_id});  
        if(!User){
           return res.status(403).send({
               error:{
                   error: true,
                   msg: "please authenticate first"
               }
           })
        }
        if(User.verified === false){
            return res.status(403).send({
                error:{
                    error: true,
                    msg: "please verify your email account"
                }
            }) 
        }

        req.user = User 
        req.token = token
        next()
    } catch (errors) {
        errors.msg = "you are not authorized"
        res.status(401).send({error:{
            error: true,
            msg: "please authenticate first"
        }})
    
    }
   
}

module.exports = auth;