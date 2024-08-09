const userModel = require("../../models/userModel");

async function userDetialCntrl(req,res){
    try{
        if(req.userid){
        const user = await userModel.findById(req.userid)
        res.json({
            data:user,
            error:false,
            success:true,
            message:"User Detials"
        })
    }else{
        throw new Error("user not found")
    }
    }catch(error){
        res.json({
        success:false,
        error:true,
        message:error.message ||error
        })
        }
    
}
module.exports = userDetialCntrl