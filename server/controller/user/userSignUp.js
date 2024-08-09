const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt')
const saltRounds=10
async function userSignUpCntrl(req,res){
    try{

        const {email,password,name} = req.body

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
        const hashPassword=await bcrypt.hash(password, saltRounds) 

        if(!hashPassword){
            throw new Error("Somthing Is wrong")
            
        } 
        const payload = {
            ...req.body,
                password:hashPassword,
                profilePic:"",
                role:"GENERAL"
        }
        if(req.file){
            payload.profilePic=req.file.originalname
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