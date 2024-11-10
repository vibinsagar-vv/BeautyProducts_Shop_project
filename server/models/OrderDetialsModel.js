const mongoose = require('mongoose')

const OrderDetialSchema = new mongoose.Schema({
    userid:String,
    address:{},
    mobilenumber:String,
    order_id:String,
    payment_id:String,
    amount:Number,
    order_status:String,
    products:[],
    
},{timestamps:true})

const OrderDetialsModel = mongoose.model("Order",OrderDetialSchema)

module.exports = OrderDetialsModel