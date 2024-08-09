const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    ProductName:String,
    ProductBrand:String,
    category:String,
    price:Number,
    sellingPrice:Number,
    productImage:[],
    description:String
    
},{timestamps:true})

const ProductModel = mongoose.model("Products",ProductSchema)

module.exports = ProductModel