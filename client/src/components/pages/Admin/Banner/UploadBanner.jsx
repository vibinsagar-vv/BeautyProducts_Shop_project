import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import productCategory from "../../../../helpers/productCategory";
import { MdUpload, MdDelete } from "react-icons/md";
import DisplayBannerImage from "./DisplayBannerImage";
import AXIOS from "axios";
import { toast } from "react-toastify";
import UploadBannerImage from "../../../../helpers/UploadBannerImge";

export default function UploadBanner({ onClose, fetchData }) {
  const [bannerData, SetBannerData] = useState({
    ProductName: "",
    category: "",
    BannerImage: "",
  });
  const [fullScreenImage, SetFullScreenImage] = useState("");
  const [openFullScreenImage, SetOpenFullScreenImage] = useState(false);

  const handleOnChange = (e) => {
    SetBannerData({ ...bannerData, [e.target.name]: e.target.value });
  };

  const handleuploadBanner = async (e) => {
    const file = e.target.files[0];
    UploadBannerImage(file);
    SetBannerData({ ...bannerData, BannerImage: file.name });
  };

  const handleDeleteBannerImage = async (image) => {
    SetBannerData({ ...bannerData, BannerImage: "" });

    AXIOS.post(
      "https://zenglow-server.onrender.com/products/delete-banner-image",
      {
        image: product,
        imageName: bannerData?.ProductName || "ProductName",
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", bannerData);
    const resData = await AXIOS.post(
      "https://zenglow-server.onrender.com/products/upload-banner",
      bannerData,
      { headers: { token: localStorage.getItem("token") } }
    );
    if (resData.data.success) {
      toast.success(resData.data.message);
    }
    if (resData.data.error) {
      toast.error(resData.data.message);
    }
    onClose();
    fetchData();
  };
  return (
    <div className="fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 pb-10 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Add Banner</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-pink-900 cursor-pointer"
            onClick={onClose}
          >
            <IoIosCloseCircle />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="grid p-4 gap-2 overflow-y-scroll h-full"
        >
          <label htmlFor="ProductName" className="mt-3">
            Product Name :
          </label>
          <input
            type="text"
            id="ProductName"
            name="ProductName"
            placeholder="Enter Product Name"
            value={bannerData.ProductName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded "
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            name="category"
            id="category"
            value={bannerData.category}
            className="p-2 bg-slate-100 border rounded "
            onChange={handleOnChange}
          >
            <option value="">Select Category</option>
            {productCategory.map((product, index) => {
              return (
                <option
                  value={product.value}
                  key={product.value + index}
                  onChange={handleOnChange}
                >
                  {product.label}
                </option>
              );
            })}
          </select>

          <label className="mt-3">Banners :</label>
          <label htmlFor="uploadBanner">
            <div className="p-2 bg-slate-100 border rounded h-36 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <MdUpload />
                </span>
                <p className="text-sm">Upload Banner Image</p>
                <input
                  className="hidden"
                  type="file"
                  name="uploadBanner"
                  id="uploadBanner"
                  onChange={handleuploadBanner}
                />
              </div>
            </div>
          </label>
          <div>
            <div className="flex flex-col items-center gap-2 overflow-x-scroll scrollbar-none py-5">
              {bannerData?.BannerImage ? (
                <div className="relative group">
                  <div className=" w-full">
                    <img
                      src={
                        `https://zenglow-server.onrender.com/Banners/` +
                        bannerData.BannerImage
                      }
                      width={600}
                      className="bg-slate-100 border flex justify-center items-center cursor-pointer w-fit  mx-auto min-h-40 h-fit"
                      alt="banner"
                      onClick={() => {
                        SetOpenFullScreenImage(true);
                        SetFullScreenImage(bannerData?.BannerImage);
                      }}
                    />
                  </div>
                  <div
                    className="absolute bottom-1 right-1 p-1 text-xs text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                    onClick={() => {
                      handleDeleteBannerImage(bannerData?.BannerImage);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              ) : (
                <p className="text-red-600 text-xs">
                  *Please Upload Banner Image
                </p>
              )}
            </div>
          </div>
          <button className="px-3 mt-3 py-2 bg-pink-700 text-white mb-10 hover:bg-pink-900">
            Add Banner
          </button>
        </form>
      </div>
      {/* display image full screen */}

      {openFullScreenImage && (
        <DisplayBannerImage
          onClose={() => SetOpenFullScreenImage(false)}
          imageName={fullScreenImage}
        />
      )}
    </div>
  );
}
