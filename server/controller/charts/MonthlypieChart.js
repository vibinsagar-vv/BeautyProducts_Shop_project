const OrderDetialsModel = require("../../models/OrderDetialsModel");

const getSalesData = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const yearSales = await OrderDetialsModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $count: "yearSalesCount",
      },
    ]);

    const monthSales = await OrderDetialsModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-${currentMonth}-01`),
            $lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
          },
        },
      },
      {
        $count: "monthSalesCount",
      },
    ]);

    res.json({
      success: true,
      error: false,
      data: {
        yearSalesCount: yearSales[0]?.yearSalesCount || 0,
        monthSalesCount: monthSales[0]?.monthSalesCount || 0,
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

module.exports = getSalesData;
