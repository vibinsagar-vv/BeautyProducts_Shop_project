const BannerModel = require("../../../models/BannerModel")

async function UploadBannerCntrl(req,res){
    try{
        const BannerData =await BannerModel.create(req.body)
        res.json({
            data:BannerData,
            success:true,
            error:false,
            message:"Banner added successfully"
        })

    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
    }

    module.exports = UploadBannerCntrl