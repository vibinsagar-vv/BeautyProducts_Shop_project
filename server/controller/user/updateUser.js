const userModel = require("../../models/userModel")

async function updateUserCnrtl(req,res){
    try{
        const sessionUser=req.userid

        const {userid,email,name,role} = req.body
        const payload = {
            ...( email&& {email:email}),
            ...( name&& {name:name}),
            ...( role&& {role:role})
        }

        const user = await userModel.findById(sessionUser)
        console.log('updated user',user.role);
        const updateUser = await userModel.findByIdAndUpdate(userid,payload)

        res.json({
            data:updateUser,
            message:"User Updated",
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

module.exports = updateUserCnrtl