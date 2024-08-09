const ProductModel = require("../../models/productModel")

async function UpdateProductCntrl(req,res){
    try{
        
        const {_id,...restBody} = req.body
        const updatedProduct = await ProductModel.findByIdAndUpdate(_id,restBody)

        res.json({
            data:updatedProduct,
            success:true,
            error:false,
            message:"Product Updated Successfully"
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = UpdateProductCntrl