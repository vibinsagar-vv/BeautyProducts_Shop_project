const AddToCartModel = require("../../models/cartProduct")
const OrderDetialsModel = require("../../models/OrderDetialsModel")
const userModel = require("../../models/userModel")

const OrderviewCntrl = async(req,res) =>{
    try{
        const curentUser =req.userid
        const orders = await OrderDetialsModel.find({
            userid:curentUser
        })      
        
        console.log(orders);
        
        res.json({
            data:orders,
            success:true,
            error:false,
            message:"order list"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}

module.exports = OrderviewCntrl