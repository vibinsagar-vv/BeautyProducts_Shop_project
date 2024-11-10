const AddToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModel");

const AddToCartCntrl = async (req, res) => {
    try {
        const { ProductId } = req.body;
        const curentUser = req.userid;

        let cart = await AddToCartModel.findOne({UserId: curentUser})
        console.log(cart);
        
            
            
        if(cart){
            const products = cart.products.map((item)=>{
                return item.ProductId
             })
             console.log(products);
            if(products.includes(ProductId)){
                return res.json({
                    message:"Already exist in Add to Cart",
                    success:false,
                    error:true
                })
            }else{
              let  userCart = await AddToCartModel.updateOne({UserId: curentUser},{products:[...cart.products,{ProductId, Quantity: 1 }]})
              res.json({
                data: userCart,
                message: "Product added to cart successfully",
                success: true,
                error: false
            });

            }
        }else{
            let userCart
            userCart = await new AddToCartModel({
                UserId: curentUser,
                products: [{ ProductId, Quantity: 1 }]
            });

            await userCart.save()

            res.json({
                data: userCart,
                message: "Product added to cart successfully",
                success: true,
                error: false
            });
        }
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
};

module.exports = AddToCartCntrl;
