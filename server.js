require('dotenv/config')
const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xxsClean = require('xss-clean')
const hpp = require('hpp')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors');
const bodyParser = require('body-parser')
const unless = require('express-unless'); 
const app = express(); 
 
//security
const rateLimiter = require('express-rate-limit')
const limiter = rateLimiter(
    {
        windowMs:10*60*60,
        max:100
    }
)

app.use(helmet())
app.use(xxsClean())
app.use(limiter)
app.use(hpp())
app.use(mongoSanitize())


 
//https://swagger.io/specification/#infoObject
   
const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        components:{
            securitySchemes: {
                bearerAuth:{
                    type: "http", 
                    scheme: "bearer",
                    bearerFormat: "JWT" 
                  }
            }
        }    ,
        
        security: {
            bearerAuth: []  
        }
        
        },
    info: {
        title: "Ecommerce System API",
        version: "1.0.0",
        description: "End Points to the Ecommerce System ",
        contact: {
            name: "Kalkidan, Tesfaye",
            email: "kal05627356@gmail.com"
        }
    },
     
    apis: ['routes/v1.router.js', 'routes/v1/*.router.js'],
 
}

const swaggerDoc = swaggerJSDoc(
    swaggerOptions
)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))



//routes
const v1Router = require('./routes/v1.router')

//middlewares
const auth = require('./middleware/auth-guard')
auth.unless = unless;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(__dirname + "/uploads"))


 app.use(auth.unless({ path:['/v1/auth/signup', '/v1/auth/signin', '/v1/common/migrate'] }))

 app.use('/v1', v1Router)


// Capture All 404 errors
app.use(function (req,res,next){
	res.status(404).send('Unable to find the requested resource!');
});

var port = process.env.port || 3000 ;
app.listen(port, () => {
    console.log(`the server is listening on port ${port} ..`)
});