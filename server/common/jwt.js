const jwt=require('jsonwebtoken')

async function CreateToken(payload){
    const token=jwt.sign(payload,process.env.jwtSecrect)
    // console.log(token);
    return token
}

async function VerifyToken(req,res,next){
try{
     const decode=await jwt.verify(req.token,process.env.jwtSecrect)
    req.resData=decode
    next()
}catch(err){
    console.log(err);
        return res.send(err.message)
}
}

module.exports={VerifyToken,CreateToken}