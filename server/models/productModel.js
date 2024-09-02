const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    ProductName:String,
    ProductBrand:String,
    category:String,
    subcategory:String,
    price:Number,
    sellingPrice:Number,
    quantity:Number,
    productImage:[],
    description:String
    
},{timestamps:true})

const ProductModel = mongoose.model("Products",ProductSchema)

module.exports = ProductModel