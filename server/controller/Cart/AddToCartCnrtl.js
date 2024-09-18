const AddToCartModel = require("../../models/cartProduct")
const userModel = require("../../models/userModel")

const AddToCartCntrl = async(req,res) =>{
    try{
        
        const {ProductId} =req?.body
        
        const curentUser = req?.userid

        const isProductAvailable = await AddToCartModel.findOne({ProductId:ProductId,UserId:curentUser})

        if(isProductAvailable){
            return res.json({
                message:"Already exist in Add to Cart",
                success:false,
                error:true
            })
        }
        const payload = {
            ProductId:ProductId,
            UserId:curentUser,
            Quantity:1
        }
        const newCart =await new AddToCartModel(payload)

        await newCart.save()

        await userModel.findByIdAndUpdate(curentUser,{
            $push:{cart:newCart._id}
        })

        res.json({
            data:newCart,
            message:"Product Added In Cart",
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

module.exports = AddToCartCntrl