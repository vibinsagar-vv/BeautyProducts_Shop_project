import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const YearlySalesPieChart = () => {
  const [data, setData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [currentYearSales, setCurrentYearSales] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8200/user/orders/yearly-pie-chart",
          { headers: { token: localStorage.getItem("token") } }
        );

        const { totalSalesAllYears, totalSalesCurrentYear } =
          response.data.data;

        // Prepare chart data
        const chartData = [
          { name: "Current Year Sales", value: totalSalesCurrentYear },
          {
            name: "Other Years Sales",
            value: totalSalesAllYears - totalSalesCurrentYear,
          },
        ];

        setData(chartData);
        setTotalSales(totalSalesAllYears);
        setCurrentYearSales(totalSalesCurrentYear);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "white" }}>Sales Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p style={{ color: "white", marginTop: "20px" }}>
        From a total of {totalSales} sales, {currentYearSales} are from the
        current year.
      </p>
    </div>
  );
};

export default YearlySalesPieChart;
