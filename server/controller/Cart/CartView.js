const AddToCartModel = require("../../models/cartProduct")
const userModel = require("../../models/userModel")

const CartViewCntrl = async(req,res) =>{
    try{
        const curentUser =req.userid
        const allProduct = await AddToCartModel.find({
            UserId:curentUser
        }).populate("ProductId")
        // const cart = await userModel.findById(curentUser).populate({
        //     path: 'cart',
        //     populate: {
        //         path: 'ProductId',
        //         model: 'Products' // The model name for your products
        //     }
        // })
        res.json({
            data:allProduct,
            success:true,
            error:false,
            message:"cart product data"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}

module.exports = CartViewCntrl