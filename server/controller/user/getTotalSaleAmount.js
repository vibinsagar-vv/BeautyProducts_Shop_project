const OrderDetialsModel = require("../../models/OrderDetialsModel")

async function getTotalSaleAmount(req,res){
    try{

        const orders = await OrderDetialsModel.find()
        let totalAmount;

        if(orders){
         totalAmount=  orders.reduce(
                (accumulator, currentValue) => {return accumulator + currentValue.amount},0);                
        }      
        res.json({
            data:totalAmount,
            success:true,
            error:false,
            message:"Total sales amount"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = getTotalSaleAmount