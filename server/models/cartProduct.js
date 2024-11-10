const mongoose = require('mongoose');

const AdToCartSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    products: [
        {
            ProductId: {
                ref: "Products",
                type: String,
                required: true
            },
            Quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, { timestamps: true });

const AddToCartModel = mongoose.model("AddToCart", AdToCartSchema);

module.exports = AddToCartModel;
