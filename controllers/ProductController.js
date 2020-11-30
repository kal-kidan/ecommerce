const {product} = require('./../model/product') 
const multer = require("multer");
const path = require("path"); 
const fs = require('fs')
const helper = require("./../lib/multer-helper")

const addProduct = async (req, res, next)=>{ 
   try { 
    let newProduct = req.body
    newProduct.vendor = req.user._id
    await product.create(newProduct)
    return res.json({status: true, msg: "you have successfully added a product"})
   } catch (error) { 
       return res.status(500).json({error: true, msg: error.message})
   }
}

const uploadProductImage = async (req, res, next)=>{ 
   if(!req.params._id){
     return res.status(400).json({error: true, msg: "please enter product id"})
   }
   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/images");
      },
      filename: helper.renameFile 
    });
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024*1024*3 },
      fileFilter: helper.validateExtension 
    }).single("image");
  
    upload(req, res, async function(err) { 
       if(req.file == undefined){
         return res.json({error: true, msg: "please enter file"})
       }

     if(err){
         res.status(400).json({
             error: true,
             msg: err.message
         })
     }
     else{
        try {
            let productId = req.params._id 
            let prod = await product.findOne({_id: productId})
            let imagePath = prod.image
            let name = path.basename(imagePath)
            if(imagePath.length > 0){
              let filePath = path.join(__dirname, '..', 'uploads', 'images', name)
              fs.unlink(filePath, (err)=>{
                if (err) {
                  return res.json({error: true, msg: err.message})
                }
              })
            }

           await product.findOneAndUpdate({_id: productId}, {image: `/uploads/images/${req.fileName}`}, {useFindAndModify: false})
           return res.json({status: true, msg: "product image uploaded successfuly"}) 
        } catch (error) {
            return res.status(500).json({error: true, msg: error.message})
            
        }
     }
  });
}

module.exports = {
   addProduct,
   uploadProductImage
}