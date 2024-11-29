const ProductModel = require("../../models/productModel")
const userModel = require("../../models/userModel")
const OrderDetialsModel =require("../../models/OrderDetialsModel")

async function getCount(req,res){
    try{

        const UserCount = await userModel.countDocuments()
        const ProductCount = await ProductModel.countDocuments()
        const OrderCount = await OrderDetialsModel.countDocuments()
        res.json({
            data:{user:UserCount,
                product:ProductCount,
                order:OrderCount
            },
            success:true,
            error:false,
            message:"All Counts"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = getCount