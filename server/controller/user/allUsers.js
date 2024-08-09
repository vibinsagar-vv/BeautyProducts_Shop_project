const userModel = require("../../models/userModel");

async function allUserCntrl(req,res){
    try{

        const allUsers = await userModel.find()

        res.json({
            data:allUsers,
            success:true,
            error:false,
            message:"All Users"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = allUserCntrl