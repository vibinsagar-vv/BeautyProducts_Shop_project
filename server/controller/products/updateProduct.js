const ProductModel = require("../../models/productModel")

async function UpdateProductCntrl(req,res){
    try{
        const {_id,productImage,...restBody} = req.body
        const image =[]
        if(productImage){
            const imageArray = productImage.split(',')
        image =[...imageArray]
        }

        // console.log(imageArray,'fgg');
        // console.log(productImage,'gg',typeof(productImage),'ff');
        
        
       if(req.files){
        req.files.forEach(element => {
            image.push(element.filename)
        });
       }
        
        const updatedProduct = await ProductModel.findByIdAndUpdate(_id,{...restBody,productImage:image})

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