const OrderDetialsModel = require("../../models/OrderDetialsModel");

const getAdminMonthlyOrderStats = async (req, res) => {
  try {
    const { year } = req.body;

    if (!year) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Year is required.",
      });
    }

    const yearStart = new Date(`${year}-01-01`);
    const yearEnd = new Date(`${year}-12-31`);

    // Aggregate data for the specified year
    const monthlyData = await OrderDetialsModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: yearStart,
            $lte: yearEnd,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: 1 }, // Count the number of sales
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = monthlyData.map((data) => ({
      month: data._id,
      totalSales: data.totalSales,
    }));

    res.json({
      data: formattedData,
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

module.exports = getAdminMonthlyOrderStats;
