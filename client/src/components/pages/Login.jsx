import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import AXIOS from 'axios';
import { toast } from 'react-toastify';
import Context from '../../context/context';

export default function Login() {
  const nav = useNavigate();
  const generalContext = useContext(Context);
  const [showpassword, Setshowpassword] = useState(false);
  const [data, SetData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resData = await AXIOS.post("http://localhost:7800/user/login", data);

      localStorage?.setItem("token", resData.data.data.token);
      localStorage?.setItem("role", resData.data.data.role);

      if (resData.data.success) {
        toast.success(resData.data.message);
        generalContext.fetchUserDetials();
        generalContext.fetchUserAddToCart();
        nav('/');
      }
      if (resData.data.error) {
        toast.error(resData.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section
      id="login"
      className=" min-h-[calc(100vh-128px)] p-[62px] flex justify-center transition-all"
    >
      <div className="flex border-2 min-h-full w-full sm:w-[60%] md:w-[60%] lg:w-[70%] xl:w-[70%] border-accent-dark rounded-xl">
        <div className="mx-auto pt-16 container rounded-l-xl lg:w-[60%] p-4">
          <div className="p-5 w-full max-w-sm mx-auto">
            <h1 className="text-center text-4xl sm:text-5xl font-bold text-accent-dark">
              Log In
            </h1>
            <form onSubmit={handleSubmit} className="pt-8 flex justify-center flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="block px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email
                </label>
              </div>

              <div className="flex">
                <div className="relative w-full">
                  <input
                    type={showpassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={handleChange}
                    className="block px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer"
                    placeholder=" "
                  />
                  <label
                    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div
                    className="cursor-pointer absolute right-1 top-2 flex items-center text-xl text-textColor-light"
                    onClick={() => Setshowpassword((prev) => !prev)}
                  >
                    <span className="hover:text-accent-light">
                      {showpassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-pink-700"
              >
                Forgot password?
              </Link>
              <button className="bg-accent-dark text-white font-bold px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-tertiary-dark">
                LOG IN
              </button>
            </form>
            <p className="lg:hidden py-6">
              Don't have an account?{" "}
              <Link
                to={"/sign-up"}
                className="text-pink-700 hover:underline hover:text-pink-900"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden bg-accent-light h-full w-[40%] rounded-r-xl lg:flex flex-col gap-8 justify-center items-center">
          <p className="text-4xl font-extrabold text-white font-serif">Hello, Friend!</p>
          <p className="text-center w-[80%] text-white">
            Enter your personal details and start your journey with us.
          </p>
          <Link
            to={"/sign-up"}
            className="border-[3px] border-white text-white font-bold text-center px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </section>
  );
}
