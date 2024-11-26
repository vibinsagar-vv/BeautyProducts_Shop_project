const { EncryptData } = require("../../common/bcrypt");

const { CreateToken } = require("../../common/jwt");

const SentMail = require('../../common/nodemail')

const user = require('../../models/userModel')


const changePassCntrl = async(req,res,next)=>{

    try{        
        const {email} = req.body
        
        const userdata = await user.findOne({email:email})

        console.log(userdata);
        
if(userdata){
        const otp = `${Math.floor(1000+Math.random()*9000)}`
        const now = new Date();
        const target = new Date(now.getTime()+2*60*1000)
        console.log(target);
        
        const encryptOtp =await EncryptData(otp)        
        
        const payload = {
            email:email,
            name:userdata?.name,
            otp:encryptOtp
        }

        console.log(payload);
        
        const token = await CreateToken(payload)

        SentMail({
            to:email,
            subject:"Forgot Password OTP",
            html: `<div>
                <h1 style={{display:'flex',justifyContent:'center',padding:'10px',fontWeight:'bolder',fontSize:'30px',margin:'20px',color:'red'}}>Verification Code</h1>
                <p>
                    Hi ${userdata?.name},
                </p>
                <p>
                    This is your temporary verification code.This is valid for 2 minutes.
                </p>
                <div style={{display:'flex',justifyContent:'center',margin:'10px 0px'}}>
                <p style={{fontSize:'30px',color:'#36022d'}}>${otp}</p>
                </div>
                <p>Thank you!</p>
                <p>
                    ZenGlow.
                </p>
            </div>`,
    
        })

        res.json({
            time:target,
            data:token,
            otp:encryptOtp,
            success:true,
            status:true,
            error:false,
            message:"otp sent to your mail id"
        })}else{

            res.json({
                success:false,
                status:false,
                error:true,
                message:"user doesn't exist"
            })
        }
        
}catch(error){
    res.json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
    
}

module.exports = changePassCntrl