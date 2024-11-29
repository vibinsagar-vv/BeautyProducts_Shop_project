import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa"; // Importing Lock icon from react-icons
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function NewPassword() {
  const [isActive, setIsActive] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] =
    useState(false);
  // const [valData, setValData] = useState({});
  const [match, setMatch] = useState(false);
  const [data, setData] = useState({
    Password: "",
    confirmPassword: "",
    email: "",
  });
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

  useEffect(() => {
    if (data?.confirmPassword && data?.Password != data?.confirmPassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [data.Password, data.confirmPassword]);

  const handleKeydown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://zenglow-server.onrender.com/user/newPassword";

    try {
      const decode = await jwtDecode(localStorage.getItem("forgot_token"));
      const { email } = decode;
      console.log(decode);
      if (data?.Password == data?.confirmPassword && email) {
        const res = await axios.post(url, { data, email: email });
        console.log(res.data);

        if (res?.data?.success) {
          localStorage.clear();
          nav("/login");
          toast.success("password changed sucessfully!");
        }
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
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
              htmlFor="Password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative w-full mb-4">
              <input
                type={showSignUpPassword ? "text" : "password"}
                name="Password"
                id="Password"
                value={data.Password}
                onChange={handleChange}
                onKeyDown={handleKeydown}
                required
                className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder=" "
              />
              <div
                className="cursor-pointer absolute right-3 top-4 flex items-center text-xl"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
              >
                <span className="hover:text-pink-700">
                  {showSignUpPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              confirmPassword
            </label>

            <div className="relative w-full mb-4">
              <input
                type={showSignUpConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                onKeyDown={handleKeydown}
                required
                className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder=" "
              />
              <div
                className="cursor-pointer absolute right-3 top-4 flex items-center text-xl"
                onClick={() =>
                  setShowSignUpConfirmPassword(!showSignUpConfirmPassword)
                }
              >
                <span className="hover:text-pink-700">
                  {showSignUpConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
          {match && (
            <p className="text-red-600 text-xs">
              *Password and confirmpassword doesn't match
            </p>
          )}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded ${
              data?.Password !== data?.confirmPassword
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none`}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
