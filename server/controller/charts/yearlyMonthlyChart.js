const OrderDetialsModel = require("../../models/OrderDetialsModel");

const getYearlyMonthlySalesStats = async (req, res) => {
  try {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const data = await OrderDetialsModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: 1 }, // Count the number of orders
        },
      },
      {
        $group: {
          _id: "$_id.year", // Group by year
          monthlySales: {
            $push: {
              month: "$_id.month",
              totalSales: "$totalSales",
            },
          },
        },
      },
      { $sort: { _id: 1 } }, // Sort by year
    ]);

    const formattedData = data.map((item) => {
      const monthlyData = months.map((month, index) => {
        const monthData = item.monthlySales.find((m) => m.month === index + 1);
        return { [month]: monthData ? monthData.totalSales : 0 };
      });

      return {
        year: item._id,
        ...Object.assign({}, ...monthlyData),
      };
    });

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

module.exports = getYearlyMonthlySalesStats;
