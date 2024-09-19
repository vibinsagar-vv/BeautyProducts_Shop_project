const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    phoneNumber:String,
    dateOfBirth:String,
    gender:String,
    password:String,
    profilePic:String,
    role:String,
    address:{
        house:String,
        country:String,
        state:String,
        district:String,
        city:String,
        street:String,
        pincode:String
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddToCart"
    }],
    Whishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      }],
    Buy_products:[]
},{timestamps:true})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel