const express = require('express')
const router = express.Router()
const multer = require('multer')
const Razorpay = require("razorpay");
const crypto = require("crypto");
const PrdctImageUploadCntrl = require('../controller/products/prdctImageUpload')
const DeletePrdctImageCntrl = require('../controller/products/deletePrdctImage')
const authToken = require('../common/authToken')
const AuthAdmin = require('../common/authAdmin')
const UploadProductCntrl = require('../controller/products/uploadProduct')
const getProductCntrl = require('../controller/products/getProduct')
const UpdateProductCntrl = require('../controller/products/updateProduct')
const ImageName = require('../controller/products/imagename')
const getCategoryProduct = require('../controller/products/getCategoryProductOne')
const Bannerstorage = require('../multer/bannerStorage')
const UploadBannerCntrl = require('../controller/products/banner/uploadBanner')
const BannerImageUploadCntrl = require('../controller/products/banner/BannerImageUpload')
const getBannerCntrl = require('../controller/products/banner/getBanner')
const DeleteBannerCntrl = require('../controller/products/banner/DeleteBanner')
const GetCategoryWiseProduct = require('../controller/products/getCategoryWiseProduct')
const DeleteProductCntrl = require('../controller/products/DeleteProduct')
const getProductDetailCntrl = require('../controller/products/getProductDetails')
const SearchProductCntrl = require('../controller/products/SearchProduct')
const Mulstorage = require('../multer/productImageStorage')
const getSubCategoryProduct = require('../controller/products/getSubCategoryPrdt');
const OrderDetialsModel = require('../models/OrderDetialsModel');
const ProductModel = require('../models/productModel');
const userModel = require('../models/userModel');
const AddToCartModel = require('../models/cartProduct');


const upload=multer({storage:Mulstorage})
const uploadBanner = multer({storage:Bannerstorage})

// router.post("/upload-product-image",upload.single('product'),PrdctImageUploadCntrl)
router.post("/delete-product-image",DeletePrdctImageCntrl)
router.post("/upload-product",authToken,AuthAdmin,upload.array('images'),UploadProductCntrl)
router.get("/get-products",getProductCntrl)
router.post("/update-product",authToken,AuthAdmin,upload.array('images'),UpdateProductCntrl)
router.get("/get-category-product",getCategoryProduct)
router.get("/get-subcategory-product/:category?",getSubCategoryProduct)
router.post("/category-product",GetCategoryWiseProduct)
router.post("/delete-product",authToken,AuthAdmin,DeleteProductCntrl)
router.post("/product-detials",getProductDetailCntrl)
router.get("/search",SearchProductCntrl)

/* banner routes */

router.post("/upload-banner",authToken,AuthAdmin,UploadBannerCntrl)
router.post("/upload-banner-image",uploadBanner.single('banner'),BannerImageUploadCntrl)
router.get("/get-banners",getBannerCntrl)
router.post("/delete-banner",authToken,AuthAdmin,DeleteBannerCntrl)

/* payment routes */

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  
  router.post("/order", async (req, res) => {
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
  });
  
  router.post("/order_validate", async (req, res,next) => {
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
  },async(req,res,next)=>{
    try{
      const {user,products,amount,quantity}=req.body;
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body.data;
      if(products.length==1){
        products[0].Quantity = quantity
      }
      const OrderData = {
        userid:user._id,
        address:{...user.address},
    mobilenumber:user.phoneNumber,
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
        });
        if(products.length>1){
          await AddToCartModel.findOneAndDelete({UserId:user._id})
        }
      }
      
    }catch(error){
      //console.log(err); 
      return res.status(500).send("Error");

    }
  });

module.exports = router