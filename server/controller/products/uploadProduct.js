const ProductModel = require('../../models/productModel')

async function UploadProductCntrl(req,res){
    try{
        const ProductData =await ProductModel.create(req.body)
        res.json({
            data:ProductData,
            success:true,
            error:false,
            message:"Product added successfully"
        })

    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
    }

    module.exports = UploadProductCntrl