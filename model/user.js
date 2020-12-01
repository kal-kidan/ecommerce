const mongoose = require('./../lib/db-connect');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

require('dotenv/config')
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 100,
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid name");
                }
            },
           
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 100,
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid name");
                }
            }
        },

        email: {
            type: String,
            required: true, 
            unique: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("the email is not valid");
                }
            },
            maxlength: 350
        },
        gender: {
            type: String,
            required: true,
            trim: true, 
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid gender");
                }
            },
            maxlength: 6
        },
        phoneNumber: {
            type: String,
            required: true,
            maxlength: 20
        }, 
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role:{
            type: String,
            enum: ['vendor', 'customer'],
            required: true,
            maxlength: 10
        },
    } ,
    {timestamps: true}
)


 
userSchema.methods.getAuthToken = async function (){
    let User= this 
    const token = jwt.sign({
        email: User.email,
        _id: User._id
    }, process.env.TOKEN_KEY); 
    return token;
 }

 userSchema.methods.toJSON = function(){
    const user = this
    userObject = user.toObject()
    if(user.role == "admin" || user.role == "patient"){
        userObject.education = ''
        userObject.experience = ''
        userObject.availaibleDate = ''
        delete  userObject.education; delete userObject.experience;
        delete userObject.availaibleDate; delete userObject.speciallity
    }
    
    delete userObject.password
    delete userObject.verified
    return userObject 
  }

  userSchema.statics.findByCredentials = async (email, password)=>{   
    let User;
    try {
        User = await user.findOne({email})
        if(!User){
            return ("incorrect username or password")
        }

        const isValidPassword = await bcrypt.compare(password, User.password);

        if(!isValidPassword){
            return ("incorrect username or password")
        }
    } catch (error) {
        return ("incorrect username or password")
    }
    return User
}

userSchema.pre('save', async function(next){ 
    const user = this
    if(user.isModified('password')){ 
        let salt = bcrypt.genSaltSync(10)
        user.password =  bcrypt.hashSync(user.password, salt)
    }
    next()
})

 

const user = mongoose.model('user',userSchema);

module.exports = {user};