const fs = require('fs')
async function DeletePrdctImageCntrl(req,res){
    try{
        const {image,imageName}=req.body
        fs.unlinkSync(`uploads/ProductImages/${imageName}_${image}`)

    }catch(error){
    console.log('main error',error);
    res.json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
}

module.exports = DeletePrdctImageCntrl