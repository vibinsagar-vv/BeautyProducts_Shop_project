const BannerModel = require("../../../models/BannerModel")

async function DeleteBannerCntrl(req,res){
    try{
        const BannerData =await BannerModel.findByIdAndDelete(req.body)
        res.json({
            data:BannerData,
            success:true,
            error:false,
            message:"Banner deleted successfully"
        })

    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
    }

    module.exports = DeleteBannerCntrl