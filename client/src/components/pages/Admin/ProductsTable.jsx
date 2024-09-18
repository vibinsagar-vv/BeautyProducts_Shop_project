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
import noImage from '../../../assest/logo/no-photo.png'

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
  const [EditData, SetEditData] = useState({});
  const [editPoduct, SetEditProduct] = useState(false);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [openUploadProduct, SetOpenUploadProduct] = useState(false);

  const fetchProducts = async () => {
    if (localStorage.getItem("token")) {
      try {
        const resData = await axios.get(
          "http://localhost:7800/products/get-products"
        );
        setAllProducts(resData?.data.data || []);
      } catch (error) {
        toast.error("Error fetching products");
      }
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
            src={value[0]?(`http://localhost:7800/ProductImages/${value[0]}`):(noImage)}
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
        Header: "Last Updated",
        accessor: "updatedAt",
        Cell: ({ value }) => moment(value).format("ll"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                SetEditProduct(true);
                SetEditData(row.original);
                // console.log("editing",row.original);
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
      "http://localhost:7800/products/delete-product",
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
      <div className="py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-tertiary-dark text-3xl">ALL PRODUCTS</h2>
        <button
          className="border-2 font-bold border-accent-light text-accent-light hover:bg-accent-light hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => {
            SetOpenUploadProduct(true);
          }}
        >
          Upload Product
        </button>
      </div>
      {/* Search Input and Entries Selector */}
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
    </div>
  );
};

export default ProductsTable;
