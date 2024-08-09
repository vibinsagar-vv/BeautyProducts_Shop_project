const ProductModel = require("../../models/productModel")

async function GetCategoryWiseProduct(req,res){
    try{
        const {Category} = req.body
        const Product = await ProductModel.find({category:Category})
        res.json({
            data:Product,
            success:true,
            error:false,
            message:"Product by Category"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = GetCategoryWiseProduct