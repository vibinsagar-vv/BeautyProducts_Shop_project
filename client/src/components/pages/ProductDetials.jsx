import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AXIOS from "axios";
import displayINRCurrency from "../../helpers/displayCurrency";
import AddToCart from "../../helpers/AddToCart";
import Context from "../../context/context";
import Footer from "../Footer";
import horizontal from "../..//assest/logo/horizontalLine.png";
import noImage from "../../assest/logo/no-photo.png";
import fetchCategoryWiseProduct from "../../helpers/fetchCategoryWiseProduct";
import Heading from "../../helpers/Heading";
import { toast } from "react-toastify";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";

export default function ProductDetials() {
  const [activeImage, SetActiveImage] = useState("");

  const [data, SetData] = useState({
    _id: "",
    ProductName: "",
    ProductBrand: "",
    category: "",
    subcategory: "",
    price: "",
    sellingPrice: "",
    productImage: [],
    description: "",
  });

  const [related, setRelated] = useState([]);

  const params = useParams();
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

  const handleBuy = () => {
    localStorage.getItem("token")
      ? nav("/buy", {
          state: { product: [{ ProductId: data }], from: "buyNow" },
        })
      : nav("/login");
  };

  const fetchProductDetail = async () => {
    const resData = await AXIOS.post(
      "https://zenglow-server.onrender.com/products/product-detials",
      { productId: params?.id }
    );
    SetData(resData.data.data);
    SetActiveImage(resData.data.data.productImage[0]);
  };

  const handleMouseEnterPrdct = (imageUrl) => {
    SetActiveImage(imageUrl);
  };

  const fetchRelatedProducts = async () => {
    const resData = await fetchCategoryWiseProduct(data.subcategory);
    setRelated(resData.data);
  };

  useEffect(() => {
    fetchProductDetail();
    window.scrollTo({
      top: 0, // Scroll to the very top
      behavior: "instant", // Smooth scrolling animation
    });
  }, [params.id]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [data]);
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)] pt-16">
        <div className="container mx-auto p-4">
          <div className="min-h-[200px] pl-4 md:pl-0 flex flex-col lg:flex-row gap-4">
            {/* product image */}
            <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 mb-10">
              <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg- border-2 rounded-lg border-accent-light p-4">
                {data.productImage[0] ? (
                  <img
                    src={`https://zenglow-server.onrender.com/ProductImages/${activeImage}`}
                    alt=""
                    className="h-full w-full object-scale-down mix-blend-multiply"
                  />
                ) : (
                  <img
                    src={noImage}
                    alt=""
                    className="h-full w-full object-scale-down mix-blend-multiply"
                  />
                )}
              </div>
              <div className="h-full">
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {data.productImage.map((image, index) => {
                    return (
                      <div
                        className="h-20 w-20 bg-white border-2 hover:border-accent-light rounded p-1"
                        key={index}
                      >
                        <img
                          src={`https://zenglow-server.onrender.com/ProductImages/${image}`}
                          alt=""
                          className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                          /* onMouseEnter={()=>{handleMouseEnterPrdct(image)}} */ onClick={() => {
                            handleMouseEnterPrdct(image);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* product detial */}
            <div className="w-full ">
              <div className="inline-block md:ml-16">
                <p>
                  <span className="bg-[#FFDAB9] px-2 py-1 text-[#333333] font-semibold rounded-full Capit">
                    {data?.ProductBrand}
                  </span>
                </p>
                <h2
                  style={{ fontFamily: "Helvetica" }}
                  className="capitalize font-bold text-[#333333] mt-16 mb-4 text-2xl py-4 lg:text-4xl max-w-[80%] text-wrap"
                >
                  {data?.ProductName}
                </h2>
                <p className="my-4">
                  <span className="capitalize text-[#999999] text-sm">
                    {data?.category}-{data?.subcategory}
                  </span>
                </p>
                <div></div>
                <div className="flex items-center gap-4">
                  <p className="text-textColor-light font-extrabold lg:text-3xl text-2xl productFont">
                    {displayINRCurrency(data?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 lg:text-xl text-base line-through ">
                    {displayINRCurrency(data?.price)}
                  </p>
                  <p className="px-4 text-4xl font-medium italic text-tertiary-dark">
                    -
                    {100 - Math.round((data?.sellingPrice / data?.price) * 100)}
                    %
                  </p>
                </div>
                {!data.freez ? (
                  <div className="flex gap-4 items-center my-8">
                    <button
                      onClick={handleBuy}
                      className="sm:px-4 py-2 bg-[#ea9791] text-white font-bold text-lg rounded-full shadow-lg transition-colors hover:bg-[#a26865] sm:min-w-[180px] min-w-[160px]"
                    >
                      Buy
                    </button>
                    <button
                      className="border-2 border-[#B76E79] sm:px-4 py-2 text-[#B76E79] hover:bg-[#B76E79] hover:text-white font-bold rounded-full shadow-lg transition-colors sm:min-w-[180px] min-w-[160px]"
                      onClick={(e) => handleAddToCart(e, data?._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4 items-center my-8">
                    <button className="px-16 py-2 bg-gray-500 text-white font-bold text-lg rounded-full shadow-lg transition-colors min-w-[180px]">
                      Out Of Stock
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr className="border-gray-300" />
          <div className="w-full p-4 bg-gray-50 my-4">
            <div className="w-full grid text-center grid-cols-4">
              <div className="md:text-2xl text-xl font-bold flex justify-center flex-col px-2 border-r-2 border-black gap-4 items-center">
                <MdOutlinePublishedWithChanges />
                <span className="text-sm md:text-base">7 day replacement</span>
              </div>
              <div className="md:text-2xl text-xl font-bold flex justify-center flex-col px-2 border-r-2 border-black gap-4 items-center">
                <MdOutlineVerifiedUser />
                <span className="text-sm md:text-base">secure payment</span>
              </div>
              <div className="md:text-2xl text-xl font-bold flex justify-center flex-col px-2 border-r-2 border-black gap-4 items-center">
                <FaShippingFast />
                <span className="text-sm md:text-base">fast delivery</span>
              </div>
              <div className="md:text-2xl text-xl font-bold flex justify-center flex-col px-2 gap-4 items-center">
                <BiSolidOffer />
                <span className="text-sm md:text-base">lowest price</span>
              </div>
            </div>
          </div>
          <hr className="mb-6 border-gray-300" />
          <div className="flex md:flex-row flex-col">
            <div className="md:px-4 md:border-r-2 py-10 min-w-[50%]">
              <h1 className="text-2xl font-semibold">Description :-</h1>
              <p className="sm:ml-20 ml-10  mt-6">{data?.description}</p>
            </div>
            <div className="md:px-4 min-w-[50%] py-10 text-slate-600">
              <h1 className="text-2xl text-center text-black mb-10 font-semibold underline">
                Product Specification
              </h1>
              <div className="flex justify-between max-w-[300px] sm:ml-20 ml-6  mt-6">
                <span>Category :</span> <span>{data?.category}</span>
              </div>
              <div className="flex justify-between max-w-[300px] sm:ml-20 ml-6  mt-6">
                <span>SubCategory :</span> <span>{data?.subcategory}</span>
              </div>
              <div className="flex justify-between max-w-[300px] sm:ml-20 ml-6  mt-6">
                <span>Manufacture :</span> <span>{data?.ProductBrand}</span>
              </div>
              <div className="flex justify-between max-w-[300px] sm:ml-20 ml-6  mt-6">
                <span>Max Retail Price :</span> <span>{data?.price} Rs</span>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-300" />
          {related[1] && (
            <div>
              <div className="pb-5 mt-5">
                <h2 className="text-2xl lg:text-5xl capitalize text-center Marck font-semibold pt-4 pb-3">
                  {"related Products"}
                </h2>
                <div className="flex justify-center items-center">
                  <img className="w-36" src={horizontal} alt="" />
                </div>
              </div>
              <div className="md:max-w-7xl h-[320px] overflow-hidden">
                <div className="w-full px-8 h-[320px] py-4 justify-start flex scrollbar-none mx-auto md:gap-x-36 gap-10  overflow-x-scroll ">
                  {related[0] &&
                    related.map((product, index) => {
                      console.log("112", product);

                      if (index <= 5 && product._id !== data._id) {
                        return (
                          <Link
                            to={`/product/${product?._id}`}
                            key={index}
                            className=" max-h-[270px]  min-w-40 lg:min-w-48 bg-white shadow-accent-dark shadow-lg rounded-lg  hover:shadow-accent-dark hover:shadow-2xl transition-shadow duration-300"
                          >
                            <div className="relative h-48  lg:max-h-72 rounded-t-lg bg-primary-light flex items-center justify-center ">
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
                            </div>
                            <div className="p-2 flex flex-col h-16">
                              <h2 className="font-semibold text-lg lg:text-xl text-gray-800 truncate">
                                {product?.ProductName}
                              </h2>
                              <p className="text-sm text-gray-500 capitalize">
                                {product?.category}
                              </p>
                            </div>
                          </Link>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
