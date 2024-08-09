const ProductModel = require("../../models/productModel")

async function getProductCntrl(req,res){
    try{
        const allProducts = await ProductModel.find().sort({createdAt : -1})
        res.json({
            data:allProducts,
            success:true,
            error:false,
            message:"All products"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = getProductCntrl