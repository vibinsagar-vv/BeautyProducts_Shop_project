import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminMonthlyOrderChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  console.log(year);

  // Fetch available years from the backend
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(
          "https://zenglow-server.onrender.com/user/orders/years",
          { headers: { token: localStorage.getItem("token") } }
        );

        console.log(response.data.data, "yeatdata");

        setYears(response.data.data);
        if (response.data.data.length) {
          setYear(response.data.data[response.data.data.length - 1]); // Set the latest year as default
        }
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.post(
          "https://zenglow-server.onrender.com/user/orders/monthly",
          { year: year },
          { headers: { token: localStorage.getItem("token") } }
        );
        console.log(response.data.data, "data");

        const formattedData = response.data.data.map((item) => ({
          month: new Date(year, item.month - 1).toLocaleString("default", {
            month: "long",
          }),
          totalSales: item.totalSales,
        }));
        console.log(formattedData, "fdata");

        setMonthlyData(formattedData);
      } catch (error) {
        console.error("Error fetching admin monthly data:", error);
      }
    };

    fetchMonthlyData();
  }, [year]);

  return (
    <div className="w-full">
      <h3 className="text-3xl text-accent-light font-bold">
        Monthly Total Order Prize
      </h3>
      <label>
        Select Year:
        <select
          className="ml-10 my-6 border-black focus:border-accent-dark focus:ring-accent-light focus:outline-none"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((y) => (
            <option className="" key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>
      <div className="md:w-[80%] md:ml-10 mt-6  w-[335px] h-[200px] md:h-[400px]">
        <ResponsiveContainer>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              label={{
                value: "Number of Sales",
                angle: -90,
                position: "center",
              }}
            />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#CC2B52"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminMonthlyOrderChart;
