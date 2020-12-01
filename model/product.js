const mongoose = require('./../lib/db-connect')
const mongoosePaginate = require('mongoose-paginate')
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
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        default: ''
    },
    description: {
            type: String,
            required: true
        }
    
},
{timestamps: true}
)
productSchema.plugin(mongoosePaginate);
const product = mongoose.model('product', productSchema)
module.exports = {product}