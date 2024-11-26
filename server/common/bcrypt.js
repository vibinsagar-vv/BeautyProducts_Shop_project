const bcrypt = require('bcryptjs')

const salt = 10

const EncryptData = async(data) =>{
    console.log('in bcrypt',data);
    
    const encryptData=await bcrypt.hash(data,salt)
    console.log('inbcrypt',encryptData);
     
    return encryptData
}


const DecryptData = async(data,compareData) =>{

    const Decrypt =await  bcrypt.compare(data,compareData)
    return Decrypt

}

module.exports = {
    EncryptData,
    DecryptData
}