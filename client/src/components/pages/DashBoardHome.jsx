import Charts from "../Charts";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
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
import AutoScrollTable from "../AutoScrollTable";
import { Button } from "flowbite-react";
import displayINRCurrency from "../../helpers/displayCurrency";

export default function DashBoardHome() {
  const [count, SetCount] = useState({});
  const [totalAmount, SetTotalAmount] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [openUpdateOrder, SetOpenUpdatOrder] = useState(false);
  const [updateUserDetials, SetUpdateUserDetials] = useState({
    email: "",
    order_status: "",
    order_id: "",
    _id: "",
  });

  const header = {
    token: localStorage.getItem("token") || "",
  };

  const fetchOrders = async () => {
    try {
      const resData = await axios.post(
        "https://zenglow-server.onrender.com/products/getOrders",
        {},
        { headers: header }
      );

      setAllOrders(resData.data.data);
      console.log(resData.data.data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const fetchCounts = async () => {
    try {
      const resData = await axios.get(
        "https://zenglow-server.onrender.com/user/allCounts"
      );
      if (resData.data.success) {
        SetCount({
          ...count,
          user: resData.data.data.user,
          product: resData.data.data.product,
          order: resData.data.data.order,
        });
      }
    } catch (error) {
      console.log("Error fetching counts");
    }
  };
  const fetchTotalAmount = async () => {
    try {
      const resData = await axios.get(
        "https://zenglow-server.onrender.com/user/saleAmount"
      );
      if (resData.data.success) {
        SetTotalAmount(resData.data.data);
        console.log(totalAmount);
      }
    } catch (error) {
      console.log("Error fetching counts");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCounts();
    fetchTotalAmount();
  }, []);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;

    let scrollInterval;
    if (tableContainer) {
      scrollInterval = setInterval(() => {
        if (
          tableContainer.scrollTop + tableContainer.clientHeight >=
          tableContainer.scrollHeight
        ) {
          // Reset to top when reaching the bottom
          tableContainer.scrollTop = 0;
        } else {
          // Scroll down
          tableContainer.scrollTop += 1; // Adjust scroll speed by changing the increment value
        }
      }, 50); // Adjust speed with the interval time in ms
    }

    return () => clearInterval(scrollInterval); // Cleanup interval on component unmount
  }, []);

  // Columns configuration (Status column added)
  const columns = useMemo(
    () => [
      { Header: "Order Id", accessor: "order_id" },
      { Header: "Amount (₹)", accessor: "amount" },
      {
        Header: "Date",
        accessor: "updatedAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Status",
        accessor: "order_status",
        Cell: ({ value }) => {
          let colorClass = "";
          if (value === "Order placed") colorClass = "bg-blue-500";
          else if (value === "Shipped") colorClass = "bg-yellow-500";
          else if (value === "Delivered") colorClass = "bg-green-500";

          return (
            <button
              className={`text-white w-28 px-3 py-1 rounded-full ${colorClass}`}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => allOrders, [allOrders]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data },
      useSortBy // For sorting functionality
    );

  const [monthlyData, setMonthlyData] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const nav = useNavigate();
  const tableContainerRef = useRef(null);
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
    <div className="w-full pr-4">
      <h1 className="text-4xl text-accent-light font-bold">MONTHLY SALES</h1>
      <div
        onClick={() => nav("/dashboard/sales")}
        className="md:w-[80%] mt-6 sm:ml-20 sm:my-10 w-[335px] h-[350px] md:h-[300px]"
      >
        <ResponsiveContainer>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
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
      <div className="flex md:flex-row flex-col md:justify-between ml-4">
        <div className="grid md:w-[30%] w-full  md:px-10 mt-10 mb-14 grid-cols-2 sm:grid-cols-4 md:grid-cols-2 sm:gap-1 gap-3 md:gap-4">
          <button
            onClick={() => nav("all-users")}
            className="py-6 rounded-lg shadow-xl shadow-slate-400 border-2 border-white text-white bg-gradient-to-r from-emerald-500 to-emerald-900"
          >
            <div>
              <p className="md:text-lg text-xs font-semibold">Total Users</p>
              <p className="sm:text-2xl text-xs font-bold">{count?.user}</p>
            </div>
          </button>
          <button
            onClick={() => nav("products")}
            className="md:h-[140px]  py-6 rounded-lg shadow-xl shadow-slate-400 border-2 border-white text-white bg-gradient-to-r from-pink-600 to-slate-600"
          >
            <div>
              <p className="md:text-lg text-xs font-semibold">Total Products</p>
              <p className="sm:text-2xl text-xs font-bold">{count?.product}</p>
            </div>
          </button>
          <button
            onClick={() => nav("orders")}
            className="md:h-[140px]  py-6 rounded-lg shadow-xl shadow-slate-400 border-2 text-white border-white bg-gradient-to-r from-orange-400 to-red-700"
          >
            <div>
              <p className="md:text-lg text-xs font-semibold">Total Orders</p>
              <p className="sm:text-2xl text-xs font-bold">{count?.order}</p>
            </div>
          </button>
          <button
            onClick={() => nav("sales")}
            className="py-6 rounded-lg shadow-xl shadow-slate-400 border-2 border-white text-white bg-gradient-to-r from-blue-400 to-blue-900"
          >
            <div>
              <p className="md:text-lg text-xs font-semibold">
                Total SaleAmount
              </p>
              <p className="sm:text-2xl text-xs font-bold w-full">
                {displayINRCurrency(totalAmount)}
              </p>
            </div>
          </button>
        </div>
        <div className="md:p-4 md:mt-6 sm:p-12 md:w-[70%]">
          <div onClick={() => nav("/dashboard/orders")}>
            {/* Table */}
            <div
              ref={tableContainerRef}
              className="overflow-y-scroll overflow-x-auto h-[300px] border-2 scrollbar-none"
            >
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50 py-3 border border-gray-500">
                  {headerGroups.map((headerGroup) => (
                    <tr className="" {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="px-6 border-r-2 py-2 text-center border-gray-500 bg-pink-100  text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr className="" {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap text-center text-xs text-gray-500"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
