const express = require('express')
const router = express.Router()
const userSignUpCntrl = require('../controller/user/userSignUp')
const multer = require('multer')
const userSignInCntrl = require('../controller/user/userSignIn')
const authToken = require('../common/authToken')
const userDetialCntrl = require('../controller/user/userDetial')
const userLogOut = require('../controller/user/userLogOut')
const allUserCntrl = require('../controller/user/allUsers')
const updateUserCnrtl = require('../controller/user/updateUser')
const verifyToken = require('../controller/user/verifyToken')
const Mulstorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/profilePhotos/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({storage:Mulstorage})


router.get("/checkauth",authToken,verifyToken)
router.post("/sign-up",upload.single('profilePic'),userSignUpCntrl)
router.post("/login",userSignInCntrl)
router.post("/user-detials",authToken,userDetialCntrl)
router.get("/logOut",userLogOut)


//admin

router.post("/all-user",authToken,allUserCntrl)
router.post("/update-user",authToken,updateUserCnrtl)



module.exports = router

