import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";
import Context from "../../context/context";
import AXIOS from "axios";
import Heading from "../../helpers/Heading";
import displayINRCurrency from "../../helpers/displayCurrency";
import AddToCart from "../../helpers/AddToCart";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons

export default function CategoryProducts() {
  const [data, setData] = useState([]);
  const [wishlist, SetWishlist] = useState([]);
  const params = useParams();
  const nav = useNavigate();
  const category = params.categoryName;
  const context = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (localStorage.getItem("token")) {
      await AddToCart(id, nav);
      await context.fetchUserAddToCart();
    } else {
      toast.error("Please login...");
      nav("/login");
    }
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const response = await AXIOS.get(
        "http://localhost:8200/user/get-wishlist",
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response);

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
          "http://localhost:8200/user/remove-from-wishlist",
          {
            productId,
          },
          { headers: { token: localStorage.getItem("token") } }
        );
        SetWishlist(wishlist.filter((id) => id !== productId));
      } else {
        await AXIOS.post(
          "http://localhost:8200/user/add-to-wishlist",
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

  const fetchData = async () => {
    const resData = await AXIOS.get(
      `http://localhost:8200/products/get-subcategory-product/` + category
    );
    setData(resData.data.data);
  };
  useEffect(() => {
    fetchData();
    fetchWishlist();
  }, []);
  console.log(data);

  return (
    <div className="pt-20 min-h-[100vh]">
      <div className="container mx-auto p-4 pt-10 ">
        <div className="flex items-center gap-4 justify-between lg:justify-evenly overflow-scroll py-6 scrollbar-none pl-3">
          {data.map((product, index) => {
            console.log("i", product);

            return (
              <a
                href={`#` + product.subcategory}
                key={product.subcategory}
                className=" flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full shadow-pink-950 shadow-lg bg-primary-light hover:bg-white flex items-center justify-center">
                  {/* Adjusted img styles */}
                  <img
                    src={`http://localhost:8200/ProductImages/${product?.products[0].productImage[0]}`}
                    alt={product?.products[0].subcategory}
                    className="absolute max-h-20 object-scale-down hover:scale-110 transition-all  -top-3"
                  />
                </div>
                <p className="Marck text-center font-semibold text-slate-800 capitalize text-sm md:text-base pt-2">
                  {product.subcategory}
                </p>
              </a>
            );
          })}
        </div>
      </div>
      {data.map((product, index) => {
        return (
          <div className="container mx-auto md:px-4 my-6">
            <Heading text={product.subcategory} />
            <div className="flex gap-4 md:gap-10 lg:gap-12 overflow-x-auto  md:flex-wrap md:justify-center pb-16">
              {product.products.map((item, index) => {
                return (
                  <Link
                    to={`/product/${item?._id}`}
                    key={index}
                    className="ml-3 md:ml-0 flex-shrink-0 w-72 sm:w-[45%] md:w-[30%] lg:w-[22%] bg-white shadow-accent-dark shadow-lg rounded-lg overflow-hidden hover:shadow-accent-dark hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                  >
                    <div className="relative h-48 md:h-60 lg:h-72 bg-primary-light flex items-center justify-center overflow-hidden">
                      {item.productImage[0] ? (
                        <img
                          src={`http://localhost:8200/ProductImages/${item.productImage[0]}`}
                          alt={item?.ProductName}
                          className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                      ) : (
                        <img
                          src={noImage}
                          alt={item?.ProductName}
                          className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                      )}
                      <div className="absolute top-2 left-2">
                        {/* Heart icon for wishlist */}
                        {wishlist.includes(item?._id) ? (
                          <FaHeart
                            className="text-pink-500 text-2xl cursor-pointer"
                            onClick={(e) => toggleWishlist(e, item._id)}
                          />
                        ) : (
                          <FaRegHeart
                            className="text-accent-light text-2xl cursor-pointer"
                            onClick={(e) => toggleWishlist(e, item._id)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between h-40 lg:h-48">
                      <h2 className="font-semibold text-lg lg:text-xl text-gray-800 truncate">
                        {item?.ProductName}
                      </h2>
                      <p className="text-sm text-gray-500 capitalize">
                        {item?.category}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-xl text-accent-light font-bold">
                            {displayINRCurrency(item?.sellingPrice)}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            {displayINRCurrency(item?.price)}
                          </p>
                        </div>
                        {localStorage.getItem("token") && (
                          <button
                            className="py-1.5 px-4 bg-accent-light text-white font-semibold rounded-full hover:bg-tertiary-dark hover:text-white transition-colors duration-300"
                            onClick={(e) => handleAddToCart(e, item?._id)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      <Footer />
    </div>
  );
}
