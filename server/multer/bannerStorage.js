const multer = require('multer')


const Bannerstorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/Banners/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)

    }

})

module.exports = Bannerstorage