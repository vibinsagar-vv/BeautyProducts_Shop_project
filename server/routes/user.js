const express = require('express')
const multer = require('multer')
const router = express.Router()
const userSignUpCntrl = require('../controller/user/userSignUp')
const userSignInCntrl = require('../controller/user/userSignIn')
const authToken = require('../common/authToken')
const userDetialCntrl = require('../controller/user/userDetial')
const userLogOut = require('../controller/user/userLogOut')
const allUserCntrl = require('../controller/user/allUsers')
const updateUserCnrtl = require('../controller/user/updateUser')
const verifyToken = require('../controller/user/verifyToken')
const generateOtpCntrl = require('../controller/user/generateOtp')
const resendOtpCntrl = require('../controller/user/resendOtp')
const AddToCartCntrl = require('../controller/Cart/AddToCartCnrtl')
const CountAddToCartPrdctCntrl = require('../controller/Cart/countAddToCartProduct')
const CartViewCntrl = require('../controller/Cart/CartView')
const updateAddToCartCnrtl = require('../controller/Cart/updateAddToCart')
const DeleteCartProductCntrl = require('../controller/Cart/DeleteCartProduct')
const DeleteUserCnrtl = require('../controller/user/deleteUser')
const AddToWishListCntrl = require('../controller/WishList/AddToWishListCntrl')
const RemoveWishListCntrl = require('../controller/WishList/RemoveWishListCntrl')
const GetWishListCntrl = require('../controller/WishList/GetWishListCntrl')
const ChangeProfilePicCntrl = require('../controller/user/ChangeProfilePicCntrl')
const ProfilePicstorage = require('../multer/profilePicStorage')
const UpdateProfileCntrl = require('../controller/user/UpdateProfileCntrl')
const UpdateAdressCntrl = require('../controller/user/UpdateAdressContrl')
const OrderviewCntrl = require('../controller/Orders/OrderviewCntrl')

const upload=multer({storage:ProfilePicstorage})

router.get("/checkauth",authToken,verifyToken)
router.post("/sign-up",userSignUpCntrl)
router.post("/login",userSignInCntrl)
router.get("/user-detials",authToken,userDetialCntrl)
router.get("/logOut",userLogOut)
router.post("/changeProfilePic",authToken,upload.single('profile'),ChangeProfilePicCntrl)

//OTP 

router.post("/generate-otp",generateOtpCntrl)
router.post("/resend-otp",resendOtpCntrl)

//User

router.post("/update-profile",authToken,UpdateProfileCntrl)
router.post("/update-adress",authToken,UpdateAdressCntrl)

//admin

router.post("/all-user",authToken,allUserCntrl)
router.post("/update-user",authToken,updateUserCnrtl)
router.post("/delete-user",authToken,DeleteUserCnrtl)

//AddToCart

router.post("/addtocart",authToken,AddToCartCntrl)
router.get("/countAddToCart",authToken,CountAddToCartPrdctCntrl)
router.get("/view-cart-product",authToken,CartViewCntrl)
router.post("/update-cart",authToken,updateAddToCartCnrtl)
router.post("/delete-cart-product",authToken,DeleteCartProductCntrl)

//wishList

router.post('/add-to-wishlist',authToken,AddToWishListCntrl)
router.post('/remove-from-wishlist',authToken,RemoveWishListCntrl)
router.get('/get-wishlist',authToken,GetWishListCntrl)

//Orders

router.get("/view-orders",authToken,OrderviewCntrl)


module.exports = router

