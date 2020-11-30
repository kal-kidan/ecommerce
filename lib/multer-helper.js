const path = require('path')
 
validateExtension = (req, file, callback) =>{ 
   if(!(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")){
     req.fileValidationError = 'Only images are allowed';
     return callback(new Error('Upload valid image file'), false); 
   }

   callback(null, true)
 }
 renameFile = (req, file, callback) => { 
   let fileName =  file.fieldname + '-' +Date.now() + Math.round(Math.random() * 1E9)+  path.extname(file.originalname)
   req.fileName = fileName
   callback(null, fileName) 
  
}
 module.exports={
     validateExtension,
     renameFile
 }