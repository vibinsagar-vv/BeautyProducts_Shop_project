const ProductModel = require("../../models/productModel")

async function FreezProductCntrl(req,res){
    try{
        const {_id} = req.body
        
       
        const updatedProduct = await ProductModel.findByIdAndUpdate(_id,{freez:true})

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
module.exports = FreezProductCntrl


async function UnFreezProductCntrl(req,res){
    try{
        const {_id} = req.body
        
       
        const updatedProduct = await ProductModel.findByIdAndUpdate(_id,{freez:false})

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
module.exports = UnFreezProductCntrl