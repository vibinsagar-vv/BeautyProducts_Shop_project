const ProductModel = require("../../models/productModel")

const SearchProductCntrl = async(req,res) =>{
    try{
        const query = req.query.p
        const regEx = new RegExp(query,'i','g')
        const products = await ProductModel.find({
            "$or":[{
                ProductName:regEx
            },
            {
                category:regEx
            }]
        })

        res.json({
            data : products,
            message :"Search Product list",
            success:true,
            error:false
        })
    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
}
module.exports = SearchProductCntrl