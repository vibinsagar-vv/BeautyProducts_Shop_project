const User = require('../../models/userModel');

const AddToWishListCntrl =async (req, res) => {
    const { productId } = req.body;
    const userId = req?.userid; // Assuming you have user authentication
  
    try {
      const user = await User.findById(userId);
      if (!user.Whishlist.includes(productId)) {
        user.Whishlist.push(productId);
      }
      await user.save();
      res.json({ success: true, message: 'Product added to wishlist' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding to wishlist' });
    }
  }

  module.exports = AddToWishListCntrl