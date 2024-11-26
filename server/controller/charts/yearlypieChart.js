const OrderDetialsModel = require("../../models/OrderDetialsModel");

const getyearlySalesData = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Total sales for all years
    const totalSalesAllYears = await OrderDetialsModel.countDocuments();

    // Total sales for the current year
    const totalSalesCurrentYear = await OrderDetialsModel.countDocuments({
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lt: new Date(`${currentYear + 1}-01-01`),
      },
    });

    res.json({
      success: true,
      error: false,
      data: {
        totalSalesAllYears,
        totalSalesCurrentYear,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = getyearlySalesData;
