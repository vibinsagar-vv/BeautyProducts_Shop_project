async function ImageName(req,res,next){
    try{
        console.log(req.body);

    }catch(error){
    console.log('main error',error);
    res.json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
}

module.exports = ImageName