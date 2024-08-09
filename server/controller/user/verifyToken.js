async function verifyToken(req,res){
    try{
        res.json({
            success:true,
            error:false,
            message:"verified"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = verifyToken