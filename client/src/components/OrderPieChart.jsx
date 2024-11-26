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

const SalesPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8200/user/orders/get-pie-chart",
          { headers: { token: localStorage.getItem("token") } }
        );
        const { yearSalesCount, monthSalesCount } = response.data.data;

        setData([
          { name: "Yearly Sales", value: yearSalesCount },
          { name: "Monthly Sales", value: monthSalesCount },
        ]);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>Sales Distribution - Current Year</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesPieChart;
