const express = require('express')
const router = express.Router()
const multer = require('multer')
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
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
const getSubCategoryProduct = require('../controller/products/getSubCategoryPrdt')


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

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
//   });
  
  // router.post("/order", async (req, res) => {
  //   try {
  //     const { amount, currency, receipt } = req.body;
  //     const options = {
  //       amount: amount, // Amount should be in currency subunits
  //       currency: currency,
  //       receipt: receipt,
  //     };
  
  //     const order = await razorpay.orders.create(options);
  //     if (!order) return res.status(500).send("Order creation failed");
  
  //     res.json(order);
  //   } catch (err) {
  //     console.error("Order creation error:", err);
  //     res.status(500).send("Error in order creation");
  //   }
  // });
  
  // router.post("/order/validate", async (req, res) => {
  //   try {
  //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  //     const expectedSignature = crypto
  //       .createHmac("sha256", process.env.RAZORPAY_SECRET)
  //       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  //       .digest("hex");
  
  //     if (expectedSignature === razorpay_signature) {
  //       return res.json({ msg: "success", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
  //     } else {
  //       return res.status(400).json({ msg: "Transaction is not legit!" });
  //     }
  //   } catch (err) {
  //     console.error("Payment validation error:", err);
  //     res.status(500).send("Error in payment validation");
  //   }
  // });

module.exports = router