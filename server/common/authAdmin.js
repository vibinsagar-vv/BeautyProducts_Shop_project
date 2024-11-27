const userModel = require('../models/userModel')

async function AuthAdmin(req,res,next){
    try{
        const UserData = await userModel.findById(req.userid)
    if(UserData.role=="ADMIN"||UserData.role=="MASTER_ADMIN"){
        next()
    }else{
        throw new Error("Access Denied")
    }
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}

module.exports = AuthAdmin