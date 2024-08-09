const jwt = require('jsonwebtoken')
async function authToken(req,res,next){
    try{
        const token =req.headers.token
        if(!token||token===undefined){
            return res.json({
            message:"User Not logged in",
            success:false,
            error:true
            })
        }

        // if(!token){
        //     console.log('999');
        // }
        const decoded =await jwt.verify(token,process.env.jwtSecrect)
        req.userid=decoded.data.userid
        next()

        
    }catch(error){
       res.json({
        success:false,
        data:[],
        error:true,
        message:error.message ||error
       })
    }
}
module.exports = authToken