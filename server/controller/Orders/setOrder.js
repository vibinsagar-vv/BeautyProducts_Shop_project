const Razorpay = require("razorpay");
const crypto = require("crypto");


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

const SetOrder = async (req, res) => {
    try {
      const { amount, currency, receipt,products,user,quantity } = req.body;
      console.log("60",amount,currency,receipt,products,user,quantity);
      
      const options = {
        amount: amount, // Amount should be in currency subunits
        currency: currency,
        receipt: receipt,
      };
  
      const order = await razorpay.orders.create(options);
      if (!order) return res.status(500).send("Order creation failed");
  
      res.json(order);
    } catch (err) {
      console.error("Order creation error:", err);
      res.status(500).send("Error in order creation");
    }
  }

module.exports=SetOrder