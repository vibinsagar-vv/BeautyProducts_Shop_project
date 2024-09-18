const ProductModel = require("../../models/productModel")


async function getSubCategoryProduct(req,res){

    const category = req.params.category
    console.log(category);
    

    try{
        const productCategory = await ProductModel.aggregate([
            {
              $match: { category: category }  // Match products by category
            },
            {
              $group: {
                _id: '$subcategory',  // Group by subcategory
                products: { $push: '$$ROOT' }  // Push the entire document (product) into the 'products' array
              }
            },
            {
              $project: {
                _id: 0,  // Exclude _id from the output
                subcategory: '$_id',
                products: 1  // Include the products array
              }
            }
          ])


        //array to store one Product from each category

        const subCategory=productCategory.map((product)=>{
            return product.subcategory
        })

        console.log(productCategory);
        console.log(subCategory);
        
        

        res.json({
            subcategory:subCategory,
            data:productCategory,
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

module.exports = getSubCategoryProduct