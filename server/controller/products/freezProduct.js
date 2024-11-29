const ProductModel = require("../../models/productModel")

async function FreezProductCntrl(req,res){
    try{
        const {id,freez} = req.body
        console.log(!freez);
        
        
       
        const updatedProduct = await ProductModel.findByIdAndUpdate({_id:id},{freez:!freez})

        console.log(updatedProduct);
        
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
module.exports = {UnFreezProductCntrl,FreezProductCntrl}