import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";
import AXIOS from "axios";
import fetchCategoryWiseProduct from "../../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../../helpers/displayCurrency";
import AddToCart from "../../helpers/AddToCart";
import Context from "../../context/context";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons
import Heading from "../../helpers/Heading";

export default function SubCategoryProducts() {
  const [data, setData] = useState([]);
  const params = useParams();
  const [wishlist, SetWishlist] = useState([]);
  const { fetchUserAddToCart } = useContext(Context);

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const response = await AXIOS.get(
        "https://zenglow-server.onrender.com/user/get-wishlist",
        { headers: { token: localStorage.getItem("token") } }
      );

      SetWishlist(response?.data?.wishlist.map((item) => item._id));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Toggle wishlist
  const toggleWishlist = async (e, productId) => {
    e.stopPropagation();
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      toast.error("Please login...");
      return nav("/login");
    }

    try {
      if (wishlist.includes(productId)) {
        await AXIOS.post(
          "https://zenglow-server.onrender.com/user/remove-from-wishlist",
          {
            productId,
          },
          { headers: { token: localStorage.getItem("token") } }
        );
        SetWishlist(wishlist.filter((id) => id !== productId));
      } else {
        await AXIOS.post(
          "https://zenglow-server.onrender.com/user/add-to-wishlist",
          {
            productId,
          },
          { headers: { token: localStorage.getItem("token") } }
        );
        SetWishlist([...wishlist, productId]);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
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

  const fetchData = async () => {
    const categoryProduct = await fetchCategoryWiseProduct(
      params.subcategoryName
    );
    // console.log(categoryProduct);
    setData(categoryProduct.data);
  };
  useEffect(() => {
    fetchData();
    fetchWishlist();
  }, []);

  return (
    <div className="pt-24 min-h-[100vh]">
      <div>
        <Heading text={params.subcategoryName} />
      </div>
      <div className="md:max-w-7xl p-8 justify-center md:justify-start flex flex-wrap  scrollbar-none gap-6 mx-auto md:gap-x-36 gap-y-10 lg:gap-y-20 max-md:gap-20 py-4 overflow-y-scroll">
        {data.map((product, index) => {
          return (
            <Link
            to={`/product/${product?._id}`}
            key={index}
            className="ml-3 md:min-w-[306px] md:ml-0 flex-shrink-0 w-60 sm:w-[45%] md:w-[30%] lg:w-[22%] bg-white shadow-accent-dark shadow-lg rounded-lg overflow-hidden hover:shadow-accent-dark hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <div className="relative h-48 md:h-60 lg:h-72 bg-primary-light flex items-center justify-center overflow-hidden">
              <div className="absolute w-48 h-48 bg-white rounded-full blur-[50px] opacity-85"></div>
              {product.productImage[0] ? (
                <img
                  src={`https://zenglow-server.onrender.com/ProductImages/${product.productImage[0]}`}
                  alt={product?.ProductName}
                  className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              ) : (
                <img
                  src={noImage}
                  alt={product?.ProductName}
                  className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              )}
              {product.freez === true && (
                <div className="absolute w-full h-full bg-gray-400 bg-opacity-55 flex justify-center items-center">
                  <span className="text-xl font-bold bg-white px-3 text-gray-700 rounded-full">
                    Out Of Stock
                  </span>
                </div>
              )}
              <div className="absolute top-2 left-2">
                {/* Heart icon for wishlist */}
                {wishlist?.includes(product?._id) ? (
                  <FaHeart
                    className="text-pink-500 text-2xl cursor-pointer"
                    onClick={(e) => toggleWishlist(e, product._id)}
                  />
                ) : (
                  <FaRegHeart
                    className="text-accent-light text-2xl cursor-pointer"
                    onClick={(e) => toggleWishlist(e, product._id)}
                  />
                )}
              </div>
            </div>
            <div className="p-4 flex flex-col justify-between h-40 lg:h-48">
              <h2 className="font-semibold text-lg lg:text-xl text-gray-800 truncate">
                {product?.ProductName}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {product?.category}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-xl text-accent-light font-bold">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                {
                  <button
                    className={`py-1.5 px-4 font-semibold rounded-full  ${
                      !product?.freez
                        ? `bg-accent-light text-white hover:bg-tertiary-dark hover:text-white`
                        : `bg-gray-500 text-white`
                    } transition-colors duration-300`}
                    onClick={(e) =>
                      !product?.freez ? handleAddToCart(e, product?._id) : ""
                    }
                  >
                    Add to Cart
                  </button>
                }
              </div>
            </div>
          </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
