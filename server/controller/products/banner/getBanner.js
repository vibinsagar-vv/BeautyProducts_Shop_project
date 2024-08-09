const BannerModel = require("../../../models/BannerModel")

async function getBannerCntrl(req,res){
    try{
        const allBanners = await BannerModel.find().sort({createdAt : -1})
        res.json({
            data:allBanners,
            success:true,
            error:false,
            message:"All Banners"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = getBannerCntrl