const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
    ProductName:String,
    category:String,
    BannerImage:String    
},{timestamps:true})

const BannerModel = mongoose.model("Banner",BannerSchema)

module.exports = BannerModel