import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AXIOS from "axios";
import displayINRCurrency from "../../helpers/displayCurrency";
import VerticalCardProduct from "../VerticalCardProduct";
import AddToCart from "../../helpers/AddToCart";
import Context from "../../context/context";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";
import noImage from '../../assest/logo/no-photo.png'
export default function ProductDetials() {
  const [activeImage, SetActiveImage] = useState("");

  const [data, SetData] = useState({
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
      toast.error("please login...");
      nav("/login");
    }
  };

  const fetchProductDetail = async () => {
    const resData = await AXIOS.post(
      "http://localhost:7800/products/product-detials",
      { productId: params?.id }
    );
    SetData(resData.data.data);
    SetActiveImage(resData.data.data.productImage[0]);
  };

  const handleMouseEnterPrdct = (imageUrl) => {
    SetActiveImage(imageUrl);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)] pt-16">
        <div className="container mx-auto p-4">
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            {/* product image */}
            <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 mb-10">
              <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg- border-2 rounded-lg border-accent-light p-4">
                {data.productImage[0]?(<img
                  src={`http://localhost:7800/ProductImages/${activeImage}`}
                  alt=""
                  className="h-full w-full object-scale-down mix-blend-multiply"
                />):(<img
                  src={noImage}
                  alt=""
                  className="h-full w-full object-scale-down mix-blend-multiply"
                />)}
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
                          src={`http://localhost:7800/ProductImages/${image}`}
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
            <div>
              <p>
                <span className="bg-[#FFDAB9] px-2 py-1 text-[#333333] font-semibold rounded-full Capit">
                  {data?.ProductBrand}
                </span>
              </p>
              <h2 className="capitalize text-[#333333] mt-16 text-2xl font-medium py-4 lg:text-4xl max-w-[80%] text-wrap">
                {data?.ProductName}
              </h2>
              <p>
                <span className="capitalize text-[#999999] text-sm">
                  {data?.category}-{data?.subcategory}
                </span>
              </p>
              <div>star</div>
              <div className="flex items-center gap-4">
                <p className="text-textColor-light font-extrabold lg:text-3xl text-2xl productFont">
                  {displayINRCurrency(data?.sellingPrice)}
                </p>
                <p className="text-slate-500 lg:text-xl text-base line-through ">
                  {displayINRCurrency(data?.price)}
                </p>
                <p className="px-4 text-4xl font-medium italic text-tertiary-dark">
                  -{100 - Math.round((data?.sellingPrice / data?.price) * 100)}%
                </p>
              </div>
              <div className="flex gap-4 items-center my-8">
                <button className="px-4 py-2 bg-[#ea9791] text-white font-bold text-lg rounded-full shadow-lg transition-colors hover:bg-[#a26865] min-w-[180px]">
                  Buy
                </button>
                <button
                  className="border-2 border-[#B76E79] px-4 py-2 text-[#B76E79] hover:bg-[#B76E79] hover:text-white font-bold rounded-full shadow-lg transition-colors min-w-[180px]"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>
              <div>
                <p className="text-lg font-medium">Description : </p>
                <p className="pl-4">{data?.description}</p>
              </div>
            </div>
          </div>
          <div className="bg-accent-light w-full mt-8 flex items-center justify-center text-4xl capitalize font-bold font-serif">recomended products</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
