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
const getMonthlyOrderStats = require('../controller/Orders/monthlyOrderviewCntrl')
const getYearlyMonthlySalesStats = require('../controller/charts/yearlyMonthlyChart')
const getOrderYears = require('../controller/Orders/Orderyears')
const getSalesData = require('../controller/charts/MonthlypieChart')
const getyearlySalesData = require('../controller/charts/yearlypieChart')
const changePassCntrl = require('../controller/user/changePassCntrl')
const newPasswordCntrl = require('../controller/user/newPasswordCntrl')
const verifyPassOtpCntrl = require('../controller/user/verifyPassOtp')

const upload=multer({storage:ProfilePicstorage})

router.get("/checkauth",authToken,verifyToken)
router.post("/sign-up",userSignUpCntrl)
router.post("/login",userSignInCntrl)
router.get("/user-detials",authToken,userDetialCntrl)
router.post("/logOut",userLogOut)
router.post("/changeProfilePic",authToken,upload.single('profile'),ChangeProfilePicCntrl)

//OTP 

router.post("/generate-otp",generateOtpCntrl)
router.post("/resend-otp",resendOtpCntrl)

//User

router.post("/update-profile",authToken,UpdateProfileCntrl)
router.post("/update-adress",authToken,UpdateAdressCntrl)
router.post("/changepassword",changePassCntrl)
router.post("/verifyPassOtp",verifyPassOtpCntrl)
router.post("/newPassword",newPasswordCntrl)
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
router.post("/orders/monthly",authToken,getMonthlyOrderStats)
router.get("/sales/yearly-monthly",authToken,getYearlyMonthlySalesStats)
router.get("/orders/years",authToken,getOrderYears)
router.get("/orders/get-pie-chart",authToken,getSalesData)
router.get("/orders/yearly-pie-chart",authToken,getyearlySalesData)


module.exports = router

