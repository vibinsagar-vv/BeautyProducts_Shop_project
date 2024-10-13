const user = require('../../models/userModel')

const UpdateProfileCntrl = async(req,res)=>{
    try{
    const userId = req.userid
    const userData =req.body
    // console.log(userId)
    
    // console.log("data",userData);
    
    // console.log("123",{...userData});
    
    const updatedUser = await user.findByIdAndUpdate(
        userId,
        { ...userData.user
        },
        { new: true, runValidators: true }
    );
        console.log("updated",updatedUser);

        res.json({
            data:updatedUser,
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
module.exports = UpdateProfileCntrl