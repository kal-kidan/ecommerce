const mongoose = require('./../lib/db-connect') 
const {product} = require('./product')
const {user} = require('./user')

const cartSchema =  mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'user' ,
        async validate(value){
            let foundUser = await user.find({_id: value, role: "vendor"})
            if(!foundUser){
                throw new Error("we coudn't find the vendor id");
            }
        }
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'product',
        unique: true,
        async validate(value){
            let foundUser = await product.find({_id: value})
            if(!foundUser){
                throw new Error("we coudn't find the product id");
            }
        }
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'user' 
    }, 
    quantity:{
        type: Number,
        required: true
    }
    
},
{timestamps: true}
)

const cart = mongoose.model('cart', cartSchema)
module.exports = {cart}