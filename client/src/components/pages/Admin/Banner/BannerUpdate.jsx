import React, { useEffect, useState } from "react";
import AXIOS from "axios";
import UploadBanner from "./UploadBanner";
import AllBanners from "./AllBanners";
export default function BannerUpdate() {
  const [openUploadBanner, SetOpenUploadBanner] = useState(false);
  const [allBanners, SetAllBannerss] = useState([]);

  const fetchBanner = async () => {
    if (localStorage.getItem("token")) {
      const resData = await AXIOS.get(
        "https://zenglow-server.onrender.com/products/get-banners"
      );
      SetAllBannerss(resData?.data.data || []);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div>
      <div>
        <div className="bg-white py-2 px-4 flex justify-between items-center">
          <div>
            <p className="text-4xl my-6 font-bold text-accent-light mb-10">
              Banners
            </p>
          </div>
          <button
            className="border-2 border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white transition-all py-1 px-3 rounded-full "
            onClick={() => {
              SetOpenUploadBanner(true);
            }}
          >
            Add Banners
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-190px)] gap-5 max-md:gap-20 py-4 overflow-y-scroll">
          {allBanners.map((banner, index) => {
            return (
              <div>
                <AllBanners
                  data={banner}
                  key={index + "allProducts"}
                  fetchData={fetchBanner}
                />
              </div>
            );
          })}
        </div>

        {openUploadBanner && (
          <UploadBanner
            onClose={() => {
              SetOpenUploadBanner(false);
            }}
            fetchData={fetchBanner}
          />
        )}
      </div>
    </div>
  );
}
