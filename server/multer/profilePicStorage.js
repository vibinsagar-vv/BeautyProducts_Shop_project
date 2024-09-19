const multer = require('multer')
const path = require('path')


const ProfilePicstorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/profilePhotos/')
    },
    filename:function(req,file,cb){
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, req.userid + path.extname(file.originalname)); // Keep original extension

    }

})

module.exports = ProfilePicstorage