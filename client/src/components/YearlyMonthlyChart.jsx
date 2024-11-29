import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const YearlyMonthlyBlockChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "https://zenglow-server.onrender.com/user/sales/yearly-monthly",
          { headers: { token: localStorage.getItem("token") } }
        );
        console.log(response.data.data, "yearly");
        setChartData(response.data.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="w-full">
      <h3 className="text-3xl text-accent-light font-bold">
        Yearly and Monthly Total Sales
      </h3>
      <div className="md:w-[80%] sm:ml-32 md:ml-10 mt-6 flex z-10 w-[335px] h-[200px] md:h-[400px]">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            {months.map((month, index) => (
              <Bar
                key={index}
                dataKey={month}
                stackId="a"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlyMonthlyBlockChart;
