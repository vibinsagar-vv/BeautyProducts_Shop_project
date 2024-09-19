import React, { useContext, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import AXIOS from "axios";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import Context from "../context/context";
import { useNavigate } from "react-router-dom";

export default function ChangeProfilePic({callfun, user, onClose }) {
  const [newimage, setNewImage] = useState("");
  const nav = useNavigate();
  const context = useContext(Context)
  const [previewimage, setPreviewImage] = useState("");
  const header = {
    token: localStorage.getItem("token") || "",
  };
  const updateProfilePic = async () => {
    const resData = await AXIOS.post("http://localhost:7800/user/update-user", {
      headers: header,
    });

    console.log("role updated", resData.data);
    if (resData.data.success) {
      toast.success(resData.data.message);
      onClose();
      callfun();
     
    }
    if (resData.data.error) {
      toast.error(resData.data.message);
      onClose();
      callfun();
      nav(-1)
      
    }
  };
  const handleImageChange = (e) => {
    console.log(e.target.files);
    setNewImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = async() =>{

    const formData = new FormData();
    formData.append("profile",newimage)

    const resData = await AXIOS.post(
        "http://localhost:7800/user/changeProfilePic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (resData.data.success) {
        toast.success(resData.data.message);
      }
      if (resData.data.error) {
        toast.error(resData.data.message);
      }
      onClose();
      callfun()
      nav(0)

  }
  return (
    <div className="absolute w-full h-full z-10 flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-50">
      <div className="w-full mx-auto rounded bg-white shadow-md p-4 max-w-sm">
        <button
          className="block ml-auto text-2xl hover:text-pink-900 cursor-pointer"
          onClick={onClose}
        >
          <IoIosCloseCircle />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change Profile Picture</h1>

        <div className="flex justify-center items-center">
          <div className="rounded-full  relative w-40 h-40 overflow-hidden shadow-accent-dark shadow-lg cursor-pointer flex justify-center">
            <label
              htmlFor="uploadImage"
              className="absolute bottom-0 py-6 bg-opacity-75 text-black font-bold cursor-pointer bg-slate-200 w-40 text-center"
            >
              Upload picture
            </label>
            {user?.profilePic || previewimage ? (
              previewimage ? (
                <img
                  className="w-40 h-40 bg-green-100 rounded-full"
                  src={previewimage}
                  alt=""
                />
              ) : (
                <img
                  className="w-40 h-40 bg-green-100 rounded-full"
                  src={`http://localhost:7800/profilePhotos/${user.profilePic}`}
                  alt=""
                />
              )
            ) : (
              <div className="w-40 h-40 flex justify-center items-center text-[162px] text-accent-dark">
                <FaUserCircle />
              </div>
            )}
          </div>{" "}
        </div>
        <div className="flex items-center justify-center my-4">
          <input
            type="file"
            id="uploadImage"
            onChange={handleImageChange}
            className="bg-green-200 w-40 h-40 rounded-full hidden"
          />
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-pink-700 text-white hover:bg-pink-800"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
