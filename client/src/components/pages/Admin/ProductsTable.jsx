import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import UploadProducts from "../../UploadProducts";
import AdminEditProduct from "../../AdminEditProduct";
import noImage from "../../../assest/logo/no-photo.png";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

// Global Filter component for search
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <div className="group">
    <span className="">
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        className="border border-gray-300 focus:border-accent-light focus:border-2 outline-none rounded-md p-2"
        placeholder="Type to search..."
      />
    </span>
  </div>
);

const ProductsTable = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [openEdit, SetOpenEdit] = useState(false);
  const [editDetials, SetEditDetials] = useState({});
  const [EditData, SetEditData] = useState({});
  const [editPoduct, SetEditProduct] = useState(false);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [openUploadProduct, SetOpenUploadProduct] = useState(false);
  const nav = useNavigate();
  const fetchProducts = async () => {
    if (localStorage.getItem("token")) {
      try {
        const resData = await axios.get(
          "https://zenglow-server.onrender.com/products/get-products"
        );
        setAllProducts(resData?.data.data || []);
      } catch (error) {
        toast.error("Error fetching products");
      }
    }
  };

  const handleFreez = async () => {
    try {
      const resData = await axios.post(
        "https://zenglow-server.onrender.com/products/freez_product",
        {
          id: editDetials._id,
          freez: editDetials?.freez ? true : false,
        }
      );
      if (resData.data.success) {
        SetOpenEdit(false);
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Columns configuration
  const columns = useMemo(
    () => [
      {
        Header: "Product",
        accessor: "productImage",
        Cell: ({ value }) => (
          <img
            src={
              value[0]
                ? `https://zenglow-server.onrender.com/ProductImages/${value[0]}`
                : noImage
            }
            alt="Product"
            className="object-scale-down w-16 h-16"
          />
        ),
      },
      {
        Header: "Product Name",
        accessor: "ProductName",
        Cell: ({ value }) => (
          <span className="text-gray-900 text-start font-bold capitalize w-56 flex text-wrap">
            {value}
          </span>
        ),
      },
      { Header: "Brand", accessor: "ProductBrand" },
      { Header: "Category", accessor: "category" },
      { Header: "Subcategory", accessor: "subcategory" },
      { Header: "Price", accessor: "price" },
      { Header: "Selling Price", accessor: "sellingPrice" },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: ({ value }) => (
          <span
            className={`${
              value < 20 ? "text-red-600 font-bold" : "text-green-500"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "freez",
        Cell: ({ value }) => {
          if (value) {
            return <span className="text-red-600 font-semibold">freez</span>;
          } else {
            return (
              <span className="text-lime-600 font-semibold">Un Freez</span>
            );
          }
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <button
              onClick={() => handleDelete(row.original._id)}
              className="text-red-600 text-2xl hover:text-red-800"
            >
              <span><MdDelete/></span>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => allProducts, [allProducts]);

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
  const handleEdit = (product) => {
    console.log("Editing product:", product);
    // Implement your edit logic here
  };

  const handleDelete = async (productId) => {
    const resData = await axios.post(
      "https://zenglow-server.onrender.com/products/delete-product",
      { _id: productId },
      { headers: { token: localStorage.getItem("token") } }
    );
    if (resData.data.success) {
      toast.success(resData.data.message);
    }
    if (resData.data.error) {
      toast.error(resData.data.message);
    }
    fetchProducts();
    console.log("Deleting product with ID:", productId);
    // Implement your delete logic here
  };

  return (
    <div className="p-4">
      <div className="py-2 md:px-4 md:flex  md:justify-between items-center">
        <h2 className="font-bold text-tertiary-dark text-3xl">ALL PRODUCTS</h2>
        <button
          className="border-2 mt-6 md:mt-0 font-bold border-accent-light text-accent-light hover:bg-accent-light hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => {
            SetOpenUploadProduct(true);
          }}
        >
          Add Product
        </button>
      </div>
      {/* Search Input and Entries Selector */}
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

      {/* Scrollable Table */}
      <div className="overflow-x-auto rounded-none mt-8 h-[440px] custom-scrollbar">
        <table
          {...getTableProps()}
          className="min-w-full max-h-40 overflow-hidden  divide-y  divide-gray-200 mt-4"
        >
          <thead className="bg-gray-50 ">
            {headerGroups.map((headerGroup) => (
              <tr className="" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 border-2 text-center border-white py-3  bg-accent-light text-xs font-medium text-white uppercase tracking-wider"
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
                      onClick={() => {
                        SetOpenEdit(true);
                        SetEditDetials(row.original);
                        SetEditData(row.original);
                        console.log(editDetials);
                      }}
                      {...cell.getCellProps()}
                      className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500"
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
      {openUploadProduct && (
        <UploadProducts
          onClose={() => {
            SetOpenUploadProduct(false);
          }}
          fetchData={fetchProducts}
        />
      )}
      {editPoduct && (
        <AdminEditProduct
          ProductData={EditData}
          onClose={() => {
            SetEditProduct(false);
          }}
          fetchData={fetchProducts}
        />
      )}
      {openEdit && (
        <div className="absolute w-full h-full z-10 flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-50">
          <div className="w-full mx-auto rounded p-10 bg-white shadow-md max-w-sm">
            <button
              className="block ml-auto text-2xl hover:text-pink-900 cursor-pointer"
              onClick={() => SetOpenEdit(false)}
            >
              <IoIosCloseCircle />
            </button>
            <div>
              <div className="mb-8">
                <span className="text-xl font-bold">
                  Update {editDetials.ProductName}
                </span>
              </div>
              <div className="my-4 flex justify-between px-10">
                <button
                  onClick={() => {
                    handleFreez();
                  }}
                  className="bg-red-600 text-white px-6 py-2 rounded"
                >
                  {editDetials.freez ? "Unfreez" : "Freez"}
                </button>
                <button
                  onClick={() => {
                    SetEditProduct(true);
                    SetOpenEdit(false);
                  }}
                  className="bg-green-600 text-white px-6 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
