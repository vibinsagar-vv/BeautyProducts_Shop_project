const AddToCartModel = require("../../models/cartProduct")

const updateAddToCartCnrtl = async(req,res) =>{
    try{
        const curentUser = req.userid
        const cartPrdctId = req.body.Id

        const qty = req.body.Quantity
        
        // Update the quantity of the specific product
        const updatedCart = await AddToCartModel.findOneAndUpdate(
            { UserId: curentUser, "products._id": cartPrdctId },
            { $set: { "products.$.Quantity": qty } }, // Use positional operator $ to access the matched product
            { new: true } // Return the updated document
        ).populate("products.ProductId");

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Cart or product not found"
            });
        }

        res.json({
            data: updatedCart,
            success: true,
            error: false,
            message: "Product quantity updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
}
module.exports = updateAddToCartCnrtl