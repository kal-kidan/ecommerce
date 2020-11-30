require('dotenv').config({path: './../.env'})
const database = process.env.db
const config = {
    db: {
        protocol: 'mongodb',
        url: 'localhost',
        port: '27017',
        database: database
    }
}


module.exports = config;