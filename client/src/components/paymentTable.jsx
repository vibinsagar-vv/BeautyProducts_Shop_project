import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";
import { toast } from "react-toastify";
import ChangeUserRole from "./ChangeUserRole";
import { IoIosCloseCircle } from "react-icons/io";

// Global Filter component for search
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <span>
    Search:{" "}
    <input
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      className="border border-gray-300 rounded-md p-2"
      placeholder="Type to search..."
    />
  </span>
);

const PaymentTable = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [openUpdateOrder, SetOpenUpdatOrder] = useState(false);
  const [updateUserDetials, SetUpdateUserDetials] = useState({});
  const [activeTab, setActiveTab] = useState(null); // Track the active tab

  const handleClick = (index) => {
    setActiveTab(index); // Update the active tab index
  };

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

  const handleStatus = async (id, status) => {
    try {
      const resData = await axios.post(
        "https://zenglow-server.onrender.com/products/setStatus",
        { id, status },
        { headers: header }
      );
      if (resData.data.success) {
        toast.success("order status updated");
        SetOpenUpdatOrder(false);
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  console.log(updateUserDetials);

  // Columns configuration (Status column added)
  const columns = useMemo(
    () => [
      { Header: "Order Id", accessor: "order_id" },
      { Header: "User", accessor: "email" },
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
          if (value === "Order placed") colorClass = "bg-red-500";
          else if (value === "Shipped") colorClass = "bg-yellow-400";
          else if (value === "Delivered") colorClass = "bg-green-500";

          return (
            <button
              className={`text-white min-w-32 px-3 py-2 rounded-full ${colorClass}`}
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Only the rows for the active page
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: setTablePageSize, // Rename to avoid conflict
    state: { pageIndex, globalFilter },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize } },
    useGlobalFilter, // For search functionality
    useSortBy, // For sorting functionality
    usePagination // For pagination functionality
  );

  // Handle page size changes
  useEffect(() => {
    setTablePageSize(pageSize);
  }, [pageSize, setTablePageSize]);

  // Edit and Delete handlers
  const handleEdit = (user) => {
    console.log("Editing user:", user);
    // Implement your edit logic here
  };

  const handleDelete = async (userId) => {
    console.log("Deleting user with ID:", userId);
    const ResData = await axios.post(
      "https://zenglow-server.onrender.com/user/delete-user",
      { _id: userId },
      { headers: header }
    );
    if (ResData.data.success) {
      toast.success(ResData.data.message);
      fetchOrders();
    }

    // Implement your delete logic here
  };

  return (
    <div className="p-4">
      <div>
        <p className="text-4xl font-bold text-accent-light mb-10">Order Page</p>
      </div>
      <div className="mb-10 grid grid-cols-4 bg-slate-300">
        {["All", "Order Placed", "Shipped", "Delivered"].map(
          (status, index) => (
            <p
              key={index}
              className={`text-center hover:bg-slate-600 hover:text-white py-3 cursor-pointer ${
                activeTab === index
                  ? "bg-accent-light text-white"
                  : "bg-slate-300"
              }`}
              onClick={() => {
                handleClick(index);
                if (status == "All") {
                  setGlobalFilter("");
                } else if (status == "Order Placed") {
                  setGlobalFilter("Order placed");
                } else if (status == "Shipped") {
                  setGlobalFilter("Shipped");
                } else if (status == "Delivered") {
                  setGlobalFilter("Delivered");
                }
              }}
            >
              {status}
            </p>
          )
        )}
      </div>
      {/* Search Input */}
      <div>
        {/* Entries per page selector */}
        <div className="md:flex md:justify-between items-center my-4">
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div className="mt-6 md:mt-0">
            <span className="text-sm text-gray-700">
              Show{" "}
              <select
                className="border group border-gray-300 rounded-md p-2"
                value={pageSize} // Make sure this reflects the current pageSize
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option
                  className="group-focus:hidden"
                  value={10}
                  defaultValue={true}
                >
                  10
                </option>
                {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>{" "}
              entries
            </span>
          </div>
        </div>
        <div className="text-sm w-full flex justify-end text-gray-700">
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-scroll">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200 mt-4"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className="" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      onClick={() => {
                        SetUpdateUserDetials(row.original);
                        SetOpenUpdatOrder(true);
                      }}
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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

      {/* Pagination */}
      <div className="flex justify-between items-center my-4">
        <div className="flex space-x-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`${
              !canPreviousPage ? "text-gray-400" : "text-blue-600"
            } hover:underline`}
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`${
              !canPreviousPage ? "text-gray-400" : "text-blue-600"
            } hover:underline`}
          >
            Previous
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`${
              !canNextPage ? "text-gray-400" : "text-blue-600"
            } hover:underline`}
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={`${
              !canNextPage ? "text-gray-400" : "text-blue-600"
            } hover:underline`}
          >
            {">>"}
          </button>
        </div>
      </div>
      {openUpdateOrder && (
        <div className="fixed w-full h-[calc(100vh-4px)] z-50 flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-slate-300 bg-opacity-50">
          <div className="w-full mx-auto rounded py-6 px-10 bg-white shadow-md max-w-2xl">
            <button
              className="block ml-auto text-2xl hover:text-pink-900 cursor-pointer"
              onClick={() => SetOpenUpdatOrder(false)}
            >
              <IoIosCloseCircle />
            </button>
            <div>
              <h1 className="text-2xl font-bold my-4 ">
                ORDER : {updateUserDetials?.order_id}
              </h1>
              <p>USER : {updateUserDetials?.email}</p>
              <p>
                ADDRESS :{" "}
                {`${updateUserDetials?.address?.house},${updateUserDetials?.address?.street},${updateUserDetials?.address?.city},${updateUserDetials?.address?.district},${updateUserDetials?.address?.state},${updateUserDetials?.address?.country},${updateUserDetials?.address?.pincode}`}
              </p>
              <p>
                DATE : {new Date(updateUserDetials?.updatedAt).toDateString()}
              </p>
              <div className="border-2 my-4 p-4">
                {updateUserDetials?.products.map((product, index) => {
                  return (
                    <div key={index}>
                      <div className="flex mb-4 gap-2">
                        <p>PRODUCT NAME : {product?.ProductId?.ProductName},</p>
                        <p>QUANTITY : {product?.Quantity}</p>
                      </div>
                      <hr className="my-2" />
                    </div>
                  );
                })}
              </div>
              {updateUserDetials?.order_status == "Delivered" && (
                <div>
                  <span className="text-red-600 text-lg font-semibold">
                    Products Delivered To Customer.
                  </span>
                </div>
              )}

              <div className="w-full flex justify-end">
                {updateUserDetials?.order_status == "Order placed" && (
                  <button
                    onClick={() => {
                      handleStatus(
                        updateUserDetials?._id,
                        updateUserDetials?.order_status
                      );
                    }}
                    className="bg-accent-light text-white font-bold px-3 py-2 rounded"
                  >
                    SHIP PRODUCT
                  </button>
                )}
                {updateUserDetials?.order_status == "Shipped" && (
                  <button
                    onClick={() => {
                      handleStatus(
                        updateUserDetials?._id,
                        updateUserDetials?.order_status
                      );
                    }}
                    className="bg-red-600 text-white font-bold px-3 py-2 rounded"
                  >
                    DELIVERED
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
