const User = require('../../models/userModel');

const RemoveWishListCntrl = async (req, res) => {
    const { productId } = req.body;
    const userId = req?.userid;
  
    try {
      const user = await User.findById(userId);
      user.Whishlist = user.Whishlist.filter(id => id.toString() !== productId);
      await user.save();
      res.json({ success: true, message: 'Product removed from wishlist' });
    } catch (error) {
      res.status(500).json({ error: 'Error removing from wishlist' });
    }
  }

  module.exports = RemoveWishListCntrl