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
const getProductCntrl = require('../controller/products/getProduct');
const SetOrder = require('../controller/Orders/setOrder');
const { VerifyOrder, PlaceOrder } = require('../controller/Orders/verifyOrder');
const FetchOrders = require('../controller/Orders/fetchOrders');
const { FreezProductCntrl } = require('../controller/products/freezProduct');
const SetStatus = require('../controller/Orders/setStatus');


const upload=multer({storage:Mulstorage})
const uploadBanner = multer({storage:Bannerstorage})

// router.post("/upload-product-image",upload.single('product'),PrdctImageUploadCntrl)
router.post("/delete-product-image",DeletePrdctImageCntrl);
router.get("/get-products", getProductCntrl);
router.post("/upload-product",authToken,AuthAdmin,upload.array('images'),UploadProductCntrl);
router.post("/update-product",authToken,AuthAdmin,upload.array('images'),UpdateProductCntrl);
router.get("/get-category-product",getCategoryProduct);
router.get("/get-subcategory-product/:category?",getSubCategoryProduct);
router.post("/category-product",GetCategoryWiseProduct);
router.post("/delete-product",authToken,AuthAdmin,DeleteProductCntrl);
router.post("/product-detials",getProductDetailCntrl);
router.get("/search",SearchProductCntrl);
router.post("/freez_product",FreezProductCntrl)

/* banner routes */

router.post("/upload-banner",authToken,AuthAdmin,UploadBannerCntrl);
router.post("/upload-banner-image",uploadBanner.single('banner'),BannerImageUploadCntrl);
router.get("/get-banners",getBannerCntrl);
router.post("/delete-banner",authToken,AuthAdmin,DeleteBannerCntrl);

/* payment routes */

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  
  router.post("/order",SetOrder);
  router.post("/setStatus",authToken,AuthAdmin,SetStatus)
  router.post("/getOrders",authToken,AuthAdmin,FetchOrders)
  router.post("/order_validate",VerifyOrder,PlaceOrder);

module.exports = router