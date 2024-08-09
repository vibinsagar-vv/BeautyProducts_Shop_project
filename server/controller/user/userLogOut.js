async function userLogOut(req,res){
    try{
        res.json({
            message:"user Logged Out successfully",
            data:[],
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

module.exports=userLogOut