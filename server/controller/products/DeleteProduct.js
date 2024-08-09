const ProductModel = require("../../models/productModel")

async function DeleteProductCntrl(req,res){
    try{
        const ProductData =await ProductModel.findByIdAndDelete(req.body)
        res.json({
            data:ProductData,
            success:true,
            error:false,
            message:"Product deleted successfully"
        })

    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
    }

    module.exports = DeleteProductCntrl