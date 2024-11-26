const OrderDetialsModel = require("../../models/OrderDetialsModel");

const getOrderYears = async (req, res) => {
  try {
    // Use MongoDB aggregation to get distinct years
    const years = await OrderDetialsModel.aggregate([
      {
        $group: {
          _id: { $year: "$createdAt" },
        },
      },
      { $sort: { _id: 1 } }, // Sort years in ascending order
    ]);

    const formattedYears = years.map((year) => year._id);

    res.json({
      data: formattedYears,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = getOrderYears;
