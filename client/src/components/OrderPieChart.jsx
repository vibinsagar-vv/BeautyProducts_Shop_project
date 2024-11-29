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
          { name: "Monthly Sales", value: Math.floor((monthSalesCount/yearSalesCount)*100) },
          { name: "Other month Sales", value: Math.floor(((yearSalesCount -monthSalesCount)/yearSalesCount)*100 )},
        ]);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const COLORS = ["#CC2B52","#FFBB28"];

  return (
    <div className="w-full md:m-4">
      <h3 className="text-center text-accent-light text-4xl font-bold">Sales Distribution - Current Year</h3>
      {/* Tailwind responsive height classes */}
      <div className="h-[300px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50} // Smaller radius for mobile
              outerRadius={100} // Adjust size dynamically for mobile
              fill="#8884d8"
              label={(entry) => `${entry.value}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            l
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesPieChart;
