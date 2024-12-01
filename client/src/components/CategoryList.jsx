import React, { useEffect, useState } from "react";
import AXIOS from "axios";
import { Link } from "react-router-dom";
import Heading from "../helpers/Heading";
export default function CategoryList() {
  const [categoryProduct, SetCategoryProduct] = useState([]);
  const [loading, SetLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    SetLoading(true);
    const resData = await AXIOS.get(
      "https://zenglow-server.onrender.com/products/get-category-product"
    );
    SetLoading(false);
    SetCategoryProduct(resData.data.data);
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-2 pt-10 ">
      <Heading text="Shop By Category" />
      <div className="flex items-center px-4 gap-4 justify-between lg:justify-evenly overflow-scroll py-6 scrollbar-none pl-3">
        {loading
          ? categoryLoading.map((element, index) => {
              return (
                <div
                  className="h-16 w-16 md:min-w-20 md:h-20 rounded-full overflow-hidden animate-pulse p-4 bg-slate-200"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-subcategory/" + product?.subcategory}
                  key={product.subcategory}
                  className=" flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full shadow-pink-950 shadow-lg bg-primary-light hover:bg-[#ffec66] flex items-center justify-center">
                    {/* Adjusted img styles */}
                    <img
                      src={`https://zenglow-server.onrender.com/ProductImages/${product?.productImage[0]}`}
                      alt={product?.category}
                      className="absolute max-h-20 object-scale-down hover:scale-110 transition-all  -top-3"
                    />
                  </div>
                  <p className="Marck text-center text-nowrap font-semibold text-slate-800 capitalize text-xs md:text-base pt-2">
                    {product.subcategory}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
