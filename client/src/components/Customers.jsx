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

const UsersTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [openUpdateUser,SetOpenUpdateUser] = useState(false)
    const [updateUserDetials,SetUpdateUserDetials]=useState({
        email:"",
        name:"",
        role:"",
        _id:""
    })

  const header = {
    token: localStorage.getItem("token") || "",
  };

  // Function to generate random status
  const getRandomStatus = () => {
    const statuses = ["ordered", "shipped", "reached"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const fetchAllUsers = async () => {
    try {
      const resData = await axios.post(
        "http://localhost:7800/user/all-user",
        {},
        { headers: header }
      );

      if (resData.data.success) {
        // Assign random status to each user
        const usersWithStatus = resData.data.data.map((user) => ({
          ...user,
          status: getRandomStatus(),
        }));
        setAllUsers(usersWithStatus);
      } else {
        toast.error(resData.data.message);
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Columns configuration (Status column added)
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          let colorClass = "";
          if (value === "ordered") colorClass = "bg-red-500";
          else if (value === "shipped") colorClass = "bg-yellow-500";
          else if (value === "reached") colorClass = "bg-green-500";

          return (
            <span className={`text-white px-3 py-1 rounded-full ${colorClass}`}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={()=>{
                SetUpdateUserDetials(row.original)
                SetOpenUpdateUser(true)
                }}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => allUsers, [allUsers]);

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

  const handleDelete = async(userId) => {
    console.log("Deleting user with ID:", userId);
    const ResData = await axios.post("http://localhost:7800/user/delete-user",
        {_id:userId},
        { headers: header })
        if(ResData.data.success){
            toast.success(ResData.data.message)
            fetchAllUsers()
        }

    // Implement your delete logic here
  };

  return (
    <div className="p-4">
      {/* Search Input */}
      <div>
      

      {/* Entries per page selector */}
      <div className="flex justify-between items-center my-4">
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
        <div>
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
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
      {
            openUpdateUser&&(<ChangeUserRole 
                onClose={()=>{SetOpenUpdateUser(false)}}
                name={updateUserDetials.name}
                email={updateUserDetials.email}
                role={updateUserDetials.role}
                userid={updateUserDetials._id}
                callFun={fetchAllUsers}
                />)
        }
    </div>
  );
};

export default UsersTable;
