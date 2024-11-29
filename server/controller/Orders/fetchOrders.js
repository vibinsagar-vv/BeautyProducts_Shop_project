const OrderDetialsModel = require("../../models/OrderDetialsModel");

const FetchOrders = async(req,res)=>{
    try{
        const orderData = await OrderDetialsModel.find().sort({createdAt : -1}).populate('userid')
            console.log(orderData);
            
        res.json({
            data:orderData,
            success:true,
            error:false,
            message:"All Orders"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:true,
            message:error.message ||error
        })
  
      }
}
module.exports = FetchOrders