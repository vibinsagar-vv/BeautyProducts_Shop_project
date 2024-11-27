const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderDetialsModel = require("../../models/OrderDetialsModel");
const ProductModel = require("../../models/productModel");
const AddToCartModel = require("../../models/cartProduct");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });


const VerifyOrder = 
async (req, res,next) => {
    try {
      console.log("80",req.body);
      
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.data;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
  
      if (expectedSignature === razorpay_signature) {
        next()
      } else {
        return res.status(400).json({ msg: "Transaction is not legit!" });
      }
    } catch (err) {
      console.error("Payment validation error:", err);
      res.status(500).send("Error in payment validation");
    }
  }
  
  const PlaceOrder =  async(req,res) => {
    try{
      const {user,products,amount,quantity,from}=req.body;
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body.data;
      if(from=='buyNow'){
        products[0].Quantity = quantity
      }
      const OrderData = {
        userid:user._id,
        address:{...user.address},
    mobilenumber:user.phoneNumber,
    email:user?.email,
    order_id:razorpay_order_id,
    payment_id:razorpay_payment_id,
    amount:(amount/100),
    order_status:'Order placed',
    products:products,
      }
    
      const PlacedOrder = await OrderDetialsModel.create({...OrderData})
      console.log("117",PlacedOrder.products);
      if(PlacedOrder){
        products.forEach(async(item) => {
          let TotalSaleQty;
          const newQuantity = item.ProductId.quantity-item.Quantity;
          if(item.ProductId.TotalSaleQuantity){
            TotalSaleQty = item.ProductId.TotalSaleQuantity+item.Quantity
          }else{
            TotalSaleQty = item.Quantity
          }
          await ProductModel.updateOne({_id:item.ProductId._id},{quantity:newQuantity,TotalSaleQuantity:TotalSaleQty})
          if(newQuantity<=0){
            await ProductModel.updateOne({_id:item.ProductId._id},{freez:true})
          }
        })
        if(from=='cart'){
          await AddToCartModel.findOneAndDelete({UserId:user._id})
        }
      }
      res.json({
        message:"payment Sucess",
        success:true,
        error:false
    })
    }catch(error){
      //console.log(err); 
      return res.status(500).send("Error");

    }
  }

  module.exports ={VerifyOrder,PlaceOrder}