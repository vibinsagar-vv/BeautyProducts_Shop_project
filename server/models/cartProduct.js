const mongoose = require('mongoose')

const AdToCartSchema = new mongoose.Schema({
    ProductId:{
        ref : "Products",
        type : String
    },
    UserId:String,
    Quantity:Number
    
},{timestamps:true})

const AddToCartModel = mongoose.model("AddToCart",AdToCartSchema)

module.exports = AddToCartModel