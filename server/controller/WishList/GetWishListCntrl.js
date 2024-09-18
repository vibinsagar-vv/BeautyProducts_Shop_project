const User = require('../../models/userModel');

const GetWishListCntrl = async (req, res) => {
    const userId = req?.userid;
  
    try {
      const user = await User.findById(userId).populate('Whishlist');
      res.json({ wishlist: user.Whishlist });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching wishlist' });
    }
  }

  module.exports = GetWishListCntrl