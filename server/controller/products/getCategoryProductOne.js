const ProductModel = require("../../models/productModel")


async function getCategoryProduct(req,res){
    try{
        const productCategory = await ProductModel.distinct("category")


        //array to store one Product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await ProductModel.findOne({category:category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            category:productCategory,
            data:productByCategory,
            success:true,
            error:false,
            message:"Category Product"
        })



    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}

module.exports = getCategoryProduct