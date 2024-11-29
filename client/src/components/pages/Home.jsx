import React, { useContext, useEffect, useState } from "react";
import CategoryList from "../CategoryList";
import BannerProduct from "../BannerProduct";
import HorizontalCardProduct from "../HorizontalCardProduct";
import AXIOS from "axios";
import VerticalCardProduct from "../VerticalCardProduct";
import Heading from "../../helpers/Heading";
import { Carousel } from "flowbite-react";
import CarouselTemplate from "../CarouselTemplate";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";
import MakeUp from "../../assest/category/MakeUp.jpg";
import SkinCare from "../../assest/category/skincare.jpg";
import HairCare from "../../assest/category/haircare.jpg";
import lipsticBanner from "../../assest/banners/LipStick_Banner.jpg";
import CompactBanner from "../../assest/banners/lotion.jpg";
import SerumBanner from "../../assest/banners/serum.jpg";
import BodyCreamBanner from "../../assest/banners/bodyCream.jpg";
import sunscrenBanner from "../../assest/banners/sunscreen.jpg";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/context";
import { IoMdArrowDropright } from "react-icons/io";

export default function Home() {
  const [category, SetCategory] = useState([]);
  const [allBanner, SetAllBanner] = useState([]);
  const contex = useContext(Context);
  const [product, SetProduct] = useState([]);
  const nav = useNavigate()

  const fetchBanner = async () => {
    const resData = await AXIOS.get(
      "http://localhost:8200/products/get-banners"
    );
    SetAllBanner(resData?.data.data || []);
  };

  const fetchCategoryProduct = async () => {
    const resData = await AXIOS.get(
      "http://localhost:8200/products/get-category-product"
    );
    await SetCategory(resData.data.category);
    console.log("category", category);

    // await console.log(category);
  };

  const fetchProduct = async () => {
    const res = await contex.fetchProduct();
    SetProduct(res.data);
    console.log("product", product);
  };
  useEffect(() => {
    fetchCategoryProduct();
    fetchBanner();
    fetchProduct();
  }, []);

  const oddColorClasses = [
    ["bg-[#b01241]", "text-[#b01241]"],
    ["bg-[#60a181]", "text-[#60a181]"],
    ["bg-[#12b054]", "text-[#12b054]"],
    ["bg-[#66b012]", "text-[#66b012]"],
    ["bg-[#b08b12]", "text-[#b08b12]"],
    ["bg-[#91575a]", "text-[#91575a]"],
    ["bg-[#12b061]", "text-[#12b061]"],
  ];

  const evenColorClasses = [
    ["bg-[#7d6001]", "text-[#7d6001]"],
    ["bg-[#7d012d]", "text-[#7d012d]"],
    ["bg-[#01497d]", "text-[#01497d]"],
    ["bg-[#017d64]", "text-[#017d64]"],
    ["bg-[#7d6001]", "text-[#7d6001]"],
    ["bg-[#7d2601]", "text-[#7d2601]"],
    ["bg-[#4c77ed]", "text-[#4c77ed]"],
  ];
  return (
    <div className="min-h-screen w-full">
      <div className="h-full min-w-full pt-16">
        {/* <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          {allBanner.map((banner, index) => {
            return (
              <img
                src={`http://localhost:8200/Banners/${banner.BannerImage}`}
                alt="..."
              />
            );
          })}
        </Carousel>
      </div> */}
        <div className="">
          <CarouselTemplate />
          {/* <BannerProduct /> */}
        </div>
        <div className="px-2">
          <CategoryList />
        </div>

        <div className="grid px-4 sm:px-6 md:px-10 mt-10 mb-14 grid-cols-1 sm:grid-cols-2 gap-4">
          <img
            src={lipsticBanner}
            alt="Banner 1"
            className="w-full rounded-lg shadow-md"
          />
          <img
            src={SerumBanner}
            alt="Banner 2"
            className="w-full rounded-lg shadow-md"
          />
          <img
            src={CompactBanner}
            alt="Banner 3"
            className="w-full rounded-lg shadow-md"
          />
          <img
            src={BodyCreamBanner}
            alt="Banner 4"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 justify-center mb-14 mx-4">
          <Link
            to="/product-category/SkinCare"
            className="flex flex-col items-center"
          >
            <img
              src={SkinCare}
              className="w-40 md:h-40 rounded-lg border-4 hover:border-primary-light shadow-md hover:shadow-lg"
              alt="SkinCare"
            />
            <span className="text-xl text-black font-semibold">SkinCare</span>
          </Link>
          <Link
            to="/product-category/Makeup"
            className="flex flex-col items-center"
          >
            <img
              src={MakeUp}
              className="w-40 md:h-40 rounded-lg border-4 hover:border-primary-light shadow-md hover:shadow-lg"
              alt="MakeUp"
            />
            <span className="text-xl text-black font-semibold">MakeUp</span>
          </Link>
          <Link
            to="/product-category/Hair&Body"
            className="flex flex-col items-center"
          >
            <img
              src={HairCare}
              className="w-40 md:h-40 rounded-lg border-4 hover:border-primary-light shadow-md hover:shadow-lg"
              alt="HairCare"
            />
            <span className="text-xl text-black font-semibold">HairCare</span>
          </Link>
        </div>

        <div className="px-10">
          {category.map((name, index) => {
            // if(name=="makeup"||name=="whiteningcreams"){
            return (
              <div>
                {/* {name == "LipSticks" && (
                  <div className="w-full mt-4 flex justify-center">
                    <img className="w-[97%]" src={lipsticBanner} alt="" />
                  </div>
                )}
                {name == "Compacts" && (
                  <div className="w-full mt-4 flex justify-center">
                    <img className="w-[97%]" src={CompactBanner} alt="" />
                  </div>
                )}
                {name == "Serums & Essences" && (
                  <div className="w-full mt-4 flex justify-center">
                    <img className="w-[97%]" src={sunscrenBanner} alt="" />
                  </div>
                )} */}
                {index % 2 == 0 && (
                  <div>
                    <div className="w-full mt-4 flex ">
                      <div
                        className={`md:w-full bannerBackground md:h-80 ${
                          evenColorClasses[
                            Math.floor(Math.random() * evenColorClasses.length)
                          ][0]
                        } sm:px-20 md:px-36 flex flex-col md:text-nowrap gap-6 sm:gap-0 md:py-0 py-6 sm:flex-row items-center rounded-md`}
                      >
                        <div className="">
                          <p style={{"lineHeight":"1.5"}} className="md:text-7xl text-center text-4xl edu_australia font-bold text-white md:w-[500px] my-6 w-[300px] md:ml-20">
                            {name}
                          </p>
                          <div className="w-full flex justify-center mt-12">
                          <button onClick={()=>nav(`/product-subcategory/${name}`)}
                              className={` text-nowrap flex items-center py-2 px-4 bg-white font-semibold text-base  rounded-2xl border-white `}
                            >
                              <span>SHOW PRODUCTS</span><span><IoMdArrowDropright/></span>
                            </button>
                          </div>
                        </div>
                          <div className="w-40 md:w-60 md:ml-60 relative object-contain h-40 md:h-60 flex">
                            <div className="absolute -right-8 md:-right-0 -bottom-8 md:-bottom-0 blur-[60px] w-56 h-56 bg-white z-1 rounded-full  pr-12 opacity-65"></div>
                            {product
                              .filter((product) =>
                                product.subcategory
                                  .toLowerCase()
                                  .includes(name.toLowerCase())
                              )
                              .slice(0, 1) // Limit to only the first product in the filtered results
                              .map((product) => (
                                <img
                                  key={product._id} // Use a unique key for each product
                                  className="w-40 z-10 md:w-60 object-contain h-40 md:h-60 flex"
                                  src={`http://localhost:8200/ProductImages/${product.productImage[0]}`}
                                  alt={product.name || "Product Image"} // Provide an accessible alt text
                                />
                              ))}
                          </div>
                        
                      </div>
                    </div>
                  </div>
                )}
                {index % 2 !== 0 && (
                  <div>
                    <div className="w-full mt-4 flex ">
                      <div
                        className={`md:w-full bannerBackground md:h-80 ${
                          oddColorClasses[
                            Math.floor(Math.random() * oddColorClasses.length)
                          ][0]
                        } sm:px-20 md:px-36 flex flex-col md:text-nowrap gap-6 sm:gap-0 md:py-0 py-6 sm:flex-row items-center rounded-md`}
                      >
                        <div className="">
                          <p style={{"lineHeight":"1.5"}} className="md:text-7xl text-center text-4xl edu_australia font-bold text-white md:w-[500px] my-6 w-[300px] md:ml-20">
                            {name}
                          </p>
                          <div className="w-full flex justify-center mt-12">
                            <button onClick={()=>nav(`/product-subcategory/${name}`)}
                              className={` text-nowrap flex items-center py-2 px-4 bg-white font-semibold text-base  rounded-2xl border-white `}
                            >
                              <span>SHOW PRODUCTS</span><span><IoMdArrowDropright/></span>
                            </button>
                          </div>
                        </div>
                          <div className="w-40 md:w-60 md:ml-60 relative object-contain h-40 md:h-60 flex">
                            <div className="absolute w-56 h-56 bg-white z-1 rounded-full -right-8 md:-right-0 -bottom-8 md:-bottom-0 blur-[60px] opacity-65"></div>
                            {product
                              .filter((product) =>
                                product.subcategory
                                  .toLowerCase()
                                  .includes(name.toLowerCase())
                              )
                              .slice(0, 1) // Limit to only the first product in the filtered results
                              .map((product) => (
                                <img
                                  key={product._id} // Use a unique key for each product
                                  className="w-40 z-10 md:w-60 object-contain h-40 md:h-60 flex"
                                  src={`http://localhost:8200/ProductImages/${product.productImage[0]}`}
                                  alt={product.name || "Product Image"} // Provide an accessible alt text
                                />
                              ))}
                          </div>
                        
                      </div>
                    </div>
                  </div>
                )}
                <VerticalCardProduct
                  key={index}
                  category={name}
                  heading={`Top ${name}s`}
                />
              </div>
            );
            // }else{
            //   return(
            //     <HorizontalCardProduct key={index} category={name} heading={`Top ${name}:`}/>
            //   )
            // }
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
