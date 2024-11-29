import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../helpers/Heading";
import AddToCart from "../helpers/AddToCart";
import Context from "../context/context";
import { toast } from "react-toastify";

export default function HorizontalCardProduct({ category, heading }) {
  const [data, SetData] = useState([]);
  const [loading, SetLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);
  const nav = useNavigate();

  const handleAddToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (localStorage.getItem("token")) {
      await AddToCart(id, nav);
      await fetchUserAddToCart();
    } else {
      toast.error("please login...");
      nav("/login");
    }
  };

  const fetchData = async () => {
    SetLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    SetLoading(false);
    SetData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container  mx-auto px-4 my-6 mb-12">
      <Heading text={heading} />

      <div className="flex items-center md:justify-center gap-4 md:gap-6 overflow-scroll scrollbar-none">
        {data.map((product, index) => {
          return (
            <Link
              to={"/product/" + product?._id}
              key={index}
              className="w-full min-w-[280px] md:min-w-[304px] max-w-[280px] md:max-w-[304px] h-36 bg-white border border-black flex"
            >
              <div className="bg-white  h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                <img
                  src={`https://zenglow-server.onrender.com/ProductImages/${product.productImage[0]}`}
                  alt=""
                  className="object-scale-down h-full max-w-24 hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 w-[160px] py-4 grid bg-orange-300 bg-opacity-30">
                <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black">
                  {product?.ProductName}
                </h2>
                <p className="capitalize text-slate-500">{product.category}</p>
                <div className="flex gap-3">
                  <p className="text-black font-bold">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 text-sm line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button
                  className="text-sm bg-transparent border font-bold border-pink-600 hover:bg-pink-600 text-pink-600 hover:text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
