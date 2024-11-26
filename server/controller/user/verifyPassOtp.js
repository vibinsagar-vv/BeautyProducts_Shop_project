const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds=10
async function verifyPassOtpCntrl(req,res){
    try{
                console.log(req.body);
                
        const {userotp,token,VerifyOtp} = req.body

        if(!VerifyOtp){
            throw new Error("Otp Mismatch")
        }

        const matchOtp = await bcrypt.compare(userotp,VerifyOtp)
console.log(matchOtp);

        if(!matchOtp){
            throw new Error("Otp Mismatch")
        }
        else{
            res.json({
                success:true,
                error:false,
                message:"otp matched"
            })
        }

        console.log(token);
        
        
}catch(error){
    res.json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
}


module.exports=verifyPassOtpCntrl