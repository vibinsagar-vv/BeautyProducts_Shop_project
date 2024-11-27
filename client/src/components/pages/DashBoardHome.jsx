import Charts from "../Charts";
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
import { useNavigate } from "react-router-dom";

export default function DashBoardHome() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const nav = useNavigate()

  // Fetch available years from the backend
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8200/user/orders/years",
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
          "http://localhost:8200/user/orders/monthly",
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
    <div className="w-full pr-4">   
    <h1 className="text-4xl font-bold">MONTHLY SALES</h1>   
      <div className="md:w-[70%] mt-6 sm:ml-40 w-[335px] h-[200px] md:h-[300px]">
        <ResponsiveContainer>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis/>
            <Tooltip />
            
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
      <div className="grid sm:w-[30%] w-full sm:px-6 md:px-10 mt-10 mb-14 grid-cols-4 sm:grid-cols-2 gap-4">
        <button className="sm:py-8 py-6 rounded-lg bg-orange-600">a</button>
        <button className="sm:py-8 py-6 rounded-lg bg-orange-600">a</button>
        <button className="sm:py-8 py-6 rounded-lg bg-orange-600">a</button>
        <button className="sm:py-8 py-6 rounded-lg bg-orange-600">a</button>
      </div>
      </div>
    </div>
  );
}
