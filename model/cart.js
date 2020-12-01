const mongoose = require('./../lib/db-connect') 
const cartSchema =  mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'user' 
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'product',
        unique: true
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