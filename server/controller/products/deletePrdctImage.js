const fs = require('fs')
async function DeletePrdctImageCntrl(req,res){
    try{
        const {imageName}=req.body
        fs.unlinkSync(`uploads/ProductImages/${imageName}`)

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