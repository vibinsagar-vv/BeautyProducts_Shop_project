import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import displayINRCurrency from "../helpers/displayCurrency";
import AXIOS from "axios";
import { toast } from "react-toastify";
export default function SearchProductCard({ data, fetchData }) {
  const [editPoduct, SetEditProduct] = useState(false);

  const handleDelete = async () => {
    const resData = await AXIOS.post(
      "https://zenglow-server.onrender.com/products/delete-product",
      { _id: data._id },
      { headers: { token: localStorage.getItem("token") } }
    );
    if (resData.data.success) {
      toast.success(resData.data.message);
    }
    if (resData.data.error) {
      toast.error(resData.data.message);
    }
    fetchData();
  };
  const handleAddToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (localStorage.getItem("token")) {
      await AddToCart(id, nav);
      await fetchUserAddToCart();
    } else {
      toast.error("Please login...");
      nav("/login");
    }
  };

  return (
    <div className=" bg-primary-light border-2 border-accent-light max-h-72 p-4 rounded ">
      <div className=" w-40 h-50">
        <div className=" min-h-40 max-h-40 flex items-center justify-center">
          <img
            className="w-fit max-h-40 mx-auto"
            src={`https://zenglow-server.onrender.com/ProductImages/${data?.productImage[0]}`}
            alt={data.ProductName}
            width={120}
            height={120}
          />
        </div>
        <div className=" min-h-12">
          <h1 className="max-w-40  text-wrap line line-clamp-2">
            {data.ProductName}
          </h1>
        </div>
        <div className="">
          <p className="font-semibold text-textColor-light">
            {displayINRCurrency(data.sellingPrice)}
          </p>
        </div>
        <div className="flex gap-2 w-fit ml-auto">
          <div
            className="  p-2 bg-gray-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => {
              SetEditProduct(true);
            }}
          >
            <MdEdit />
          </div>
          <div
            className="p-2 bg-red-100 border hover:bg-accent-light rounded-full hover:text-white cursor-pointer"
            onClick={handleDelete}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
}
