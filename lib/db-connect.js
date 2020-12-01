const mongoose = require('mongoose'); 
const config = require('./../config/index') 
const localConnection = `${config.db.protocol}://${config.db.url}:${config.db.port}/${config.db.database}`
// const connection = process.env.MONGODB_URL || "mongodb://mongo:27017/cvcompiler";
try {
    mongoose.connect( localConnection,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
} catch (error) {
    console.error(error.message);
}

module.exports = mongoose;

 



