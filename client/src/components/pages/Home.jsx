import React, { useEffect, useState } from "react";
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

export default function Home() {
  const [category, SetCategory] = useState([]);
  const [allBanner, SetAllBanner] = useState([]);

  const fetchBanner = async () => {
    const resData = await AXIOS.get(
      "http://localhost:7800/products/get-banners"
    );
    SetAllBanner(resData?.data.data || []);
  };

  const fetchCategoryProduct = async () => {
    const resData = await AXIOS.get(
      "http://localhost:7800/products/get-category-product"
    );
    await SetCategory(resData.data.category);
    // await console.log(category);
  };
  useEffect(() => {
    fetchCategoryProduct();
    fetchBanner();
  }, []);

  return (
    <div className="min-h-full">
      <MyNavbar/>
      <div className="h-full pt-16">
        {/* <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          {allBanner.map((banner, index) => {
            return (
              <img
                src={`http://localhost:7800/Banners/${banner.BannerImage}`}
                alt="..."
              />
            );
          })}
        </Carousel>
      </div> */}
      <div className="">
        <CarouselTemplate/>
        {/* <BannerProduct /> */}
      </div>
      <div className="px-2">
        <CategoryList />
      </div>
      <div className="px-6">
        {category.map((name, index) => {
          // if(name=="makeup"||name=="whiteningcreams"){
          return (
            <VerticalCardProduct
              key={index}
              category={name}
              heading={`Top ${name}s`}
            />
          );
          // }else{
          //   return(
          //     <HorizontalCardProduct key={index} category={name} heading={`Top ${name}:`}/>
          //   )
          // }
        })}
      </div>
      </div>
      <Footer/>
    </div>
  );
}
