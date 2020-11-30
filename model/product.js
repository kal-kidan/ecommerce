const mongoose = require('./../lib/db-connect')
const productSchema =  mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'user' 
    },
    name:{
        type: String,
        required: true
    }, 
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description: {
            type: String,
            required: true
        }
    
},
{timestamps: true}
)

const product = mongoose.model('product', productSchema)
module.exports = {product}