const ProductModel = require("../../models/productModel")

async function getProductDetailCntrl(req,res){
    try{

        const {productId} = req.body

        const product = await ProductModel.findById(productId)

        res.json({
            data:product,
            success:true,
            error:false,
            message:"Success"
        })
        
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error?.message ||error
        })
    }
}

module.exports = getProductDetailCntrl