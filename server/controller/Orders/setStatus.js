const OrderDetialsModel = require("../../models/OrderDetialsModel");

const SetStatus =async (req,res)=>{
    try{
       const {id,status}= req.body
        let updateStatus;
       if(status=="Order placed"){
        updateStatus="Shipped"
       }else if(status=="Shipped"){
        updateStatus="Delivered"
       }else{
        updateStatus="Order placed"
       }

       console.log(req.body);

       const updatedOrder = await OrderDetialsModel.findOneAndUpdate({_id:id},{order_status:updateStatus})
       
       res.json({
        data:updatedOrder,
        success:true,
        error:false,
        message:"Order Updated"
    })

    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}

module.exports = SetStatus