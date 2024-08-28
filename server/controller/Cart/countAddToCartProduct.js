const AddToCartModel = require("../../models/cartProduct")

const CountAddToCartPrdctCntrl = async(req,res) =>{
    try{
        const userid = req.userid
        const count = await AddToCartModel.countDocuments({
            UserId:userid
        })

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