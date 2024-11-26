import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa"; // Importing Lock icon from react-icons
import { toast } from "react-toastify";

export default function ForgotPassword() {
  // const [valData, setValData] = useState({});
  const [data, setData] = useState({});
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Handle validation state reset
    // if (valData[name]) {
    //   const updatedValData = { ...valData };
    //   delete updatedValData[name];
    //   setValData(updatedValData);
    // }
  };

  const handleKeydown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8200/user/changepassword";

    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      
      if (res.data.status === true) {
        localStorage.setItem("forgot_verification", res.data.otp);
        sessionStorage.setItem("targetTime", res.data.time);
        localStorage.setItem("forgot_token", res.data.data);
        nav("/verify-ForgotPassword");
      }
      if (res.data.status === false) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      {/* Modal */}

      {/* <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              This Email Doesn't Exist
            </h2>
            <button
              onClick={() => nav("/usereg/register")}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </div> */}

      {/* Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 rounded-full p-3 mb-4">
            <FaLock className="w-8 h-8 text-gray-700" /> {/* React icon */}
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Change Password
          </h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onKeyDown={handleKeydown}
              className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Reset Password
          </button>
          <div className="text-right">
            <a
              href="/login"
              className="text-sm text-blue-500 hover:underline"
            >
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
