async function BannerImageUploadCntrl(req,res){
    try{
        res.send('success')

    }catch(error){
    console.log('main error',error);
    res.json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
}

module.exports = BannerImageUploadCntrl