import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AXIOS from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.password === data.confirmPassword) {
        const resultData = await AXIOS.post(
          "https://zenglow-server.onrender.com/user/generate-otp",
          data
        );
        localStorage.setItem("token", resultData.data.data);
        localStorage.setItem("verification", resultData.data.Otp);
        sessionStorage.setItem("targetTime", resultData.data.time);

        if (resultData.data.success) {
          toast.success(resultData.data.message);
          navigate("/otp-verification");
        } else {
          toast.error(resultData.data.message);
        }
      } else {
        toast.error("Please check the password and confirm password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      id="signup"
      className="  min-h-[calc(100vh-128px)] flex justify-center transition-all"
    >
      <div className="flex border-2 h-[480px] my-16 items-center sm:w-[50%] md:w-[50%] lg:w-[60%] xl:w-[60%] border-accent-dark rounded-xl">
        <div className="hidden lg:flex bg-accent-light h-full w-[40%] rounded-l-xl flex-col gap-8 justify-center items-center">
          <p className="text-4xl font-extrabold text-white font-serif">
            Welcome Back!
          </p>
          <p className="text-center w-[80%] text-white">
            To keep connected with us please login with your personal info
          </p>
          <Link
            to={"/login"}
            className="border-[3px] border-white text-white font-bold text-center px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all"
          >
            LOG IN
          </Link>
        </div>
        <div className="mx-auto w-full lg:w-[60%] p-4">
          <div className="mx-auto pt-16 container rounded-l-xl lg:w-[60%] p-4">
            <h1 className="text-center text-5xl font-bold text-accent-dark">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit} className="pt-8 flex flex-col gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="block ring-0 border-0 px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="block ring-0 border-0 px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="block ring-0 border-0 px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
                <div
                  className="cursor-pointer absolute right-1 top-2 flex items-center text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="hover:text-pink-700">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block ring-0 border-0 px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Confirm Password
                </label>
                <div
                  className="cursor-pointer absolute right-1 top-2 flex items-center text-xl"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span className="hover:text-pink-700">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="bg-accent-dark text-white font-bold px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-tertiary-dark"
              >
                SIGN UP
              </button>
            </form>
            <p className="lg:hidden py-6">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-pink-700 hover:underline hover:text-pink-900"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
