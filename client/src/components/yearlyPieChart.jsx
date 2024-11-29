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
          { name: "Current Year Sales", value: Math.floor((totalSalesCurrentYear/totalSalesAllYears)*100) },
          {
            name: "Other Years Sales",
            value: Math.floor(((totalSalesAllYears - totalSalesCurrentYear)/totalSalesAllYears)*100),
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

  const COLORS = ["#CC2B52", "#FFBB28"];

  return (
    <div className="w-full md:border-l-2 mt-16 md:mt-0 md:m-4 md:border-black">
            <h3 className="text-center text-accent-light text-4xl font-bold">Sales Distribution - Total</h3>
      {/* Responsive container with dynamic height */}
      <div className="h-[300px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100} // Smaller size for mobile
              fill="#8884d8"
              label={({ name, value }) => `${value}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
            label={({ name, value }) => `${value}%`}/>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-sm text-white mt-4">
        From a total of <span className="font-bold">{totalSales}</span> sales,{" "}
        <span className="font-bold">{currentYearSales}</span> are from the
        current year.
      </p>
    </div>
  );
};

export default YearlySalesPieChart;
