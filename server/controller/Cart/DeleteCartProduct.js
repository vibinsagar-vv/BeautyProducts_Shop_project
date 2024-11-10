const AddToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModel");

const DeleteCartProductCntrl=async(req,res)=>{
    try {
        const curentUser = req.userid
        const productId = req.body._id // Assuming you pass the productId in the request body
        
        // Find the user's cart and remove the product from the products array
        const updatedCart = await AddToCartModel.findOneAndUpdate(
            { UserId: curentUser },
            { $pull: { products: { _id: productId } } },
            { new: true } // Return the updated document
        ).populate("products.ProductId");

        console.log(updatedCart);
        

        const usercart = await userModel.findOneAndUpdate({_id:curentUser},{cart:updatedCart.products})
        
        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Cart not found or product does not exist in cart"
            });
        }

        res.json({
            data: updatedCart,
            success: true,
            error: false,
            message: "Product removed from cart"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
}

module.exports = DeleteCartProductCntrl