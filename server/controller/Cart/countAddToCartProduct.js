const AddToCartModel = require("../../models/cartProduct")

const CountAddToCartPrdctCntrl = async(req,res) =>{
    try{
        const userid = req.userid
        console.log(userid);
        
        const cart = await AddToCartModel.findOne({
            UserId:userid
        })
         console.log(cart);
         if(cart){
            const count = cart.products.length
        return res.json({
            data:{
                count : count
            },
            message:"ok",
            success:true,
            error:false
        })
         }else{
            return res.json({
                data:{},
                message:"Empty Cart",
                success:true,
                error:false
            })
         }
        
    }catch(error){
        res.status(500).json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = CountAddToCartPrdctCntrl