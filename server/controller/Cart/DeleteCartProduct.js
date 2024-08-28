const AddToCartModel = require("../../models/cartProduct")

const DeleteCartProductCntrl=async(req,res)=>{
    try{
        const curentUser = req.userid
        const CartProductId = req.body._id

        const deleteproduct = await AddToCartModel.deleteOne({_id:CartProductId,UserId:curentUser})

        res.json({
            data:deleteproduct,
            message:"Product Deleted From Cart",
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

module.exports = DeleteCartProductCntrl