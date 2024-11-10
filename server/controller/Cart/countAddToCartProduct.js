const AddToCartModel = require("../../models/cartProduct")

const CountAddToCartPrdctCntrl = async(req,res) =>{
    try{
        const userid = req.userid
        const cart = await AddToCartModel.findOne({
            UserId:userid
        })
         
        const count = cart.products.length
        res.json({
            data:{
                count : count
            },
            message:"ok",
            success:true,
            error:false
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = CountAddToCartPrdctCntrl