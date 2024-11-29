const ProductModel = require('../../models/productModel')

async function UploadProductCntrl(req,res){
    try{
        const image =[]
        req.files.forEach(element => {
            image.push(element.filename)
        });

        console.log(image);
        
        const ProductData =await ProductModel.create({...req.body,TotalSaleQuantity:0,productImage:image,freez:false})
        res.json({
            data:ProductData,
            success:true,
            error:false,
            message:"Product added successfully"
        })

    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
    }

    module.exports = UploadProductCntrl