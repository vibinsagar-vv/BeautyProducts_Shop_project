const AddToCartModel = require("../../models/cartProduct")

const updateAddToCartCnrtl = async(req,res) =>{
    try{
        const curentUser = req.userid
        const cartPrdctId = req.body.Id

        const qty = req.body.Quantity
        
        const updateCart = await AddToCartModel.findByIdAndUpdate({_id:cartPrdctId},{Quantity:qty})
        res.json({
            data:updateCart,
            message:"Product Updated",
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
module.exports = updateAddToCartCnrtl