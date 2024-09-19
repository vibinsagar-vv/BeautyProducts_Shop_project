const user = require('../../models/userModel')

const ChangeProfilePicCntrl = async(req,res)=>{
    try{
    console.log("abc",req.file);
    
    let image=req.file.filename

    const userId = req.userid
    const upadatedProfile = await user.findByIdAndUpdate({_id:userId},{profilePic:image})
    console.log(upadatedProfile);
    res.json({
        data:upadatedProfile,
        success:true,
        error:false,
        message:"Profile Picture Updated Successfully"
    })
}catch(error){
    res.json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
    
}

module.exports = ChangeProfilePicCntrl