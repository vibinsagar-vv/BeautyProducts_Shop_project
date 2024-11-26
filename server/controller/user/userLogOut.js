const userModel = require("../../models/userModel")

async function userLogOut(req,res){
    try{
        const {email} = req.body
         const updatedUser = await userModel.findOneAndUpdate({email:email},{online:false})
        
        res.json({
            message:"user Logged Out successfully",
            data:[],
            success:true,
            error:false
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}

module.exports=userLogOut