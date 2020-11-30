const ApiError = require('./../error/ApiError')
function errorHandler(err, req,res,next){
    if(err instanceof ApiError){
        return res.status(err.code).json({error: true, message: err.message})
    }
   
    res.status(500).json({error: true, message: "something went wrong"})
}

module.exports = errorHandler