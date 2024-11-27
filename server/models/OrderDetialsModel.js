const mongoose = require('mongoose')

const OrderDetialSchema = new mongoose.Schema({
    userid:{
        type:String,
        ref:"user"
    },
    address:{},
    mobilenumber:String,
    email:String,
    order_id:String,
    payment_id:String,
    amount:Number,
    order_status:String,
    products:[],
    
},{timestamps:true})

const OrderDetialsModel = mongoose.model("Order",OrderDetialSchema)

module.exports = OrderDetialsModel