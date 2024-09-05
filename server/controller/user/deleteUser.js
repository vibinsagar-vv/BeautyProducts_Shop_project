const userModel = require("../../models/userModel")

async function DeleteUserCnrtl(req,res){
    try{
        const sessionUser=req.userid

        const {_id} = req.body
        console.log(_id);
        
        const deleteUser = await userModel.findByIdAndDelete(_id)

        res.json({
            data:deleteUser,
            message:"User Deleted",
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

module.exports = DeleteUserCnrtl