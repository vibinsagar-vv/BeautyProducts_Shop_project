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
        "http://localhost:8200/products/getOrders",
        {},
        { headers: header }
      );

      setAllOrders(resData.data.data)
      console.log(resData.data.data);
      
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
          if (value === "Order placed") colorClass = "bg-blue-500";
          else if (value === "shipped") colorClass = "bg-yellow-500";
          else if (value === "reached") colorClass = "bg-green-500";

          return (
            <span className={`text-white px-3 py-1 rounded-full ${colorClass}`}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
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
      "http://localhost:8200/user/delete-user",
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
                    <td onClick={() => {
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
        <div className="w-full h-full bg-red-600">abc</div>
      )}
    </div>
  );
};

export default PaymentTable;
