import React, { useContext, useState } from "react";
import Logo from "../assest/logo/Logo.png";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AXIOS from "axios";
import { toast } from "react-toastify";
import { setUserDetials } from "../store/userSlice";
import Context from "../context/context";

export default function Header() {
  const [menuDisplay, SetMenuDisplay] = useState(false);
  const [search, SetSearch] = useState("");
  const nav = useNavigate();
  const url = useLocation();
  const userDetials = useSelector((state) => state?.user?.user);
  // console.log('userhead',user);
  const dispatch = useDispatch();
  console.log(url);

  const context = useContext(Context);

  const handleLogOut = async () => {
    localStorage.clear();
    const resData = await AXIOS.get(
      "https://zenglow-server.onrender.com/user/logOut"
    );
    if (resData.data.success) {
      toast.success(resData.data.message);
      dispatch(setUserDetials(null));
      SetMenuDisplay(false);
      nav("/");
    }
    if (resData.data.error) {
      toast.error(resData.data.message);
    }
  };

  const handleChangeSearch = (e) => {
    SetSearch(e.target.value);
    console.log(search);
  };
  const handleSearch = () => {
    if (search) {
      console.log("insearch", search);

      nav(`/search?p=${search}`);
    } else {
      nav("/");
    }
  };
  const handleblur = () => {
    if (search == "") {
      nav("/");
    }
  };
  console.log(url.pathname != "/login" || url.pathname != "/sign-up");

  return (
    <header className="h-16 bg-tertiary-dark fixed w-full z-40">
      <div className="w-full h-full container  flex items-center px-6 justify-between">
        <div className="">
          <Link to={"/"}>
            <img src={Logo} className="w-28 md:w-36 rounded-md mr-5" />
          </Link>
        </div>

        <div className="hidden md:flex items-center w-full justify-between max-w-sm border-2 border-primary-light bg-neutral-light rounded-full focus-within:shadow pl-5 mx-2">
          <input
            type="text"
            placeholder="search here..."
            className="h-full w-full outline-none border-none bg-transparent text-textColor-light placeholder-textColor-light focus:ring-0"
            onChange={handleChangeSearch}
            onBlur={handleblur}
          />
          <div
            className="min-w-[50px] h-10 bg-accent-light flex items-center justify-center rounded-r-full text-white"
            onClick={handleSearch}
          >
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {userDetials?._id && (
              <div
                className="text-4xl flex items-center justify-center border-2 border-accent-dark text-accent-light rounded-full  cursor-pointer"
                onClick={() => SetMenuDisplay((preve) => !preve)}
              >
                {userDetials?.profilePic ? (
                  <img
                    className="w-full h-full rounded-full"
                    src={`https://zenglow-server.onrender.com/profilePhotos/${userDetials.profilePic}`}
                    alt={userDetials.name}
                  />
                ) : (
                  <FaUserCircle />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="hidden md:block absolute z-40 border border-slate-400 bg-white bottom-0 top-11 h-fit text-center shadow-lg rounded">
                <nav className="flex flex-col">
                  <Link
                    to={"profile"}
                    className=" whitespace-nowrap hover:bg-pink-200 border border-b-slate-400 p-2"
                    onClick={() => SetMenuDisplay((preve) => !preve)}
                  >
                    Profile
                  </Link>
                  {userDetials?.role === "ADMIN" && (
                    <Link
                      to={"admin-panel/products"}
                      className=" whitespace-nowrap hover:bg-pink-200 p-2"
                      onClick={() => SetMenuDisplay((preve) => !preve)}
                    >
                      Admin panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {userDetials?._id && (
            <Link to={"cart"} className="text-2xl cursor-pointer relative">
              <span>
                <FaCartShopping />
              </span>

              <div className="bg-accent-light   text-white w-4 h-4 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-xs">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {userDetials?._id ? (
              <button
                className="px-3 py-1 text-white rounded-full bg-primary-light hover:bg-tertiary-dark text-nowrap"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            ) : (
              url.pathname != "/login" &&
              url.pathname != "/sign-up" && (
                <Link
                  to={"/login"}
                  className="px-3 py-1 text-white rounded-full bg-primary-light hover:bg-pink-800 "
                >
                  Log in
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
