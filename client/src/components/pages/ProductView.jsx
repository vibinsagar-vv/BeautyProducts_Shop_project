import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AXIOS from "axios";
import displayINRCurrency from "../../helpers/displayCurrency";
import VerticalCardProduct from "../VerticalCardProduct";
import AddToCart from "../../helpers/AddToCart";
import Context from "../../context/context";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";

export default function ProductView() {
  const [activeImage, setActiveImage] = useState("");
  const [data, setData] = useState({
    _id: "",
    ProductName: "",
    ProductBrand: "",
    category: "",
    price: "",
    sellingPrice: "",
    productImage: [],
    description: "",
  });

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
      toast.error("Please log in...");
      nav("/login");
    }
  };

  const fetchProductDetail = async () => {
    const resData = await AXIOS.post(
      "http://localhost:8200/products/product-details",
      { productId: params?.id }
    );
    setData(resData.data.data);
    setActiveImage(resData.data.data.productImage[0]);
  };

  const handleMouseEnterPrdct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  return (
    <div className="bg-white">
      <MyNavbar />
      <div className="min-h-[calc(100vh-64px)] pt-16">
        <div className="container mx-auto p-4">
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="flex flex-col lg:flex-row-reverse gap-4 mb-10 lg:w-1/2">
              <div className="h-[400px] w-full lg:h-96 lg:w-96 bg-white border border-[#B76E79] p-4 rounded-lg shadow-md">
                <img
                  src={`http://localhost:8200/ProductImages/${activeImage}`}
                  alt={data?.ProductName}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-full">
                <div className="flex gap-2 lg:flex-col overflow-x-auto lg:overflow-y-auto scrollbar-none h-full">
                  {data.productImage.map((image, index) => (
                    <div
                      className="h-20 w-20 bg-white border border-[#B76E79] rounded p-1 shadow-sm cursor-pointer transition-all transform hover:scale-105"
                      key={index}
                      onClick={() => handleMouseEnterPrdct(image)}
                    >
                      <img
                        src={`http://localhost:8200/ProductImages/${image}`}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Product Details */}
            <div className="lg:w-1/2">
              <p>
                <span className="bg-[#FFDAB9] px-2 py-1 text-[#333333] rounded-full uppercase">
                  {data?.ProductBrand}
                </span>
              </p>
              <h2 className="capitalize text-3xl font-semibold py-4 lg:text-5xl text-[#333333]">
                {data?.ProductName}
              </h2>
              <p className="capitalize text-[#999999] text-lg">
                {data?.category}
              </p>
              <div className="flex items-center gap-4 my-4">
                <p className="text-[#333333] font-bold lg:text-4xl text-2xl">
                  {displayINRCurrency(data?.sellingPrice)}
                </p>
                <p className="text-[#999999] lg:text-xl text-lg line-through">
                  {displayINRCurrency(data?.price)}
                </p>
                <p className="px-4 text-xl lg:text-2xl font-medium italic text-[#D5928E]">
                  -{100 - Math.round((data?.sellingPrice / data?.price) * 100)}%
                </p>
              </div>
              <div className="flex gap-4 items-center my-8">
                <button className="px-4 py-2 bg-[#F8C5C1] text-white font-bold text-lg rounded-full shadow-lg transition-colors hover:bg-[#D5928E] min-w-[180px]">
                  Buy Now
                </button>
                <button
                  className="border-2 border-[#B76E79] px-4 py-2 text-[#B76E79] hover:bg-[#B76E79] hover:text-white font-bold rounded-full shadow-lg transition-colors min-w-[180px]"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>
              <div>
                <p className="text-lg font-medium text-[#333333]">
                  Description:
                </p>
                <p className="pl-4 text-[#555555]">{data?.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-2xl font-semibold text-[#333333]">
              Recommended Products
            </p>
            {/* Add recommended product cards here */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
