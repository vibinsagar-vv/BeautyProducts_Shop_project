import React, { useEffect, useState } from "react";
import AXIOS from "axios";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function BannerProduct() {
  const [allBanner, SetAllBanner] = useState([]);
  const [currentBannerImage, SetCurrentBannerImage] = useState(1);
  const fetchBanner = async () => {
    const resData = await AXIOS.get(
      "http://localhost:7800/products/get-banners"
    );
    SetAllBanner(resData?.data.data || []);
  };
  const nextImage = () => {
    if (allBanner.length - 1 > currentBannerImage) {
      SetCurrentBannerImage((preve) => preve + 1);
    }
  };
  const PrevImage = () => {
    if (currentBannerImage != 0) {
      SetCurrentBannerImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    fetchBanner();
    const Intervel = setInterval(() => {
      if (allBanner.length - 1 > currentBannerImage) {
        SetCurrentBannerImage((preve) => preve + 1);
      } else {
        SetCurrentBannerImage(0);
      }
    }, 7000);
    return () => clearInterval(Intervel);
  }, [currentBannerImage]);
  return (
    <div className="">
      <div className="md:h-96 h-60 w-full bg-slate-200 relative">
        <div className="absolute  z-10 w-full h-full md:flex items-center hidden">
          <div className=" w-full flex justify-between text-xl">
            <button
              onClick={PrevImage}
              className="bg-white bg-opacity-75 shadow-md rounded h-12 w-6 text-center p-1 mx-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white bg-opacity-75 shadow-md rounded h-12 w-6 text-center p-1 mx-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="flex w-full h-full overflow-hidden">
          {allBanner.map((banner, index) => {
            return (
              <div
                className="w-full h-full min-w-full  transition-all"
                key={index}
                style={{
                  transform: `translatex(-${currentBannerImage * 100}%)`,
                }}
              >
                <img
                  src={`http://localhost:7800/Banners/${banner.BannerImage}`}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
