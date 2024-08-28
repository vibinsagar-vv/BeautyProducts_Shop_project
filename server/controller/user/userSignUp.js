const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds=10
async function userSignUpCntrl(req,res){
    try{
        console.log('userSignup:7',req.body);
                
        const {userotp,token,VerifyOtp} = req.body

        if(!VerifyOtp){
            throw new Error("Otp Mismatch")
        }

        const matchOtp = await bcrypt.compare(userotp,VerifyOtp)

        if(!matchOtp){
            throw new Error("Otp Mismatch")
        }

        console.log(token);
        
        const userDetial = await jwt.verify(token,process.env.jwtSecrect)

        

        console.log('userSignup:12',userDetial);

        const {email,name,password} = userDetial


        const user = await userModel.findOne({email})
        if(user){
            throw new Error("User Already exists")
            
        }

        if(!email){
            throw new Error("please provide email")
            
        }
        if(!password){
            throw new Error("please provide password")
            
        }
        if(!name){
            throw new Error("please provide name")
            
        }
        
        const payload = {
            ...userDetial,
                password:password,
                role:"GENERAL"
        }
        const userData = new userModel(payload)
        const saveUser =await userData.save()
        res.json({
            data:saveUser,
            success:true,
            error:false,
            message:"User created Successfully"
        })
}catch(error){
    res.json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
}


module.exports=userSignUpCntrl