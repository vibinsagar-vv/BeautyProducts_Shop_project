const user = require('../../models/userModel')

const UpdateProfileCntrl = async(req,res)=>{
    const userId = req.userid
    const userData =req.body
    console.log(userId);
    
    console.log("data",userData);
    
    console.log("123",{...userData});
    
    const updatedUser = await user.findByIdAndUpdate(
        userId,
        { ...userData.user
        },
        { new: true, runValidators: true }
    );
        console.log("updated",updatedUser);
    
}
module.exports = UpdateProfileCntrl