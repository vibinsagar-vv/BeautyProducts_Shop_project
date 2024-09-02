import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import Logo from "../assest/logo/Logo.png";
import UserLogo from "../assest/logo/UserLogo.png";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AXIOS from "axios";
import { toast } from "react-toastify";
import { setUserDetials } from "../store/userSlice";
import Context from "../context/context";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";

export default function MyNavbar() {
  const [menuDisplay, SetMenuDisplay] = useState(false);
  const [search, SetSearch] = useState("");
  const nav = useNavigate();
  const url = useLocation();
  const userDetials = useSelector((state) => state?.user?.user);
  // console.log('userhead',user);
  const dispatch = useDispatch();

  const context = useContext(Context);

  const handleLogOut = async () => {
    localStorage.clear();
    const resData = await AXIOS.get("http://localhost:7800/user/logOut");
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

  const handleSearch = (e) => {
    SetSearch(e.target.value);
    if (search) {
      console.log("insearch", search);

      nav(`/search?p=${search}`);
    } else {
      nav("/");
    }
    console.log(search);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed z-40 bg-white w-full border-gray-200 dark:bg-gray-900 shadow-md">
      <div className=" max-w-screen flex flex-wrap items-center justify-between mx-auto py-3 md:py-2 px-2 md:px-8">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to={"/"}>
            <img src={Logo} className="w-28 md:w-36 rounded-md mr-5" />
          </Link>
        </div>
        <div className=" flex items-center justify-center md:order-2 gap-1 md:gap-3">
          <div className="flex items-center justify-center gap-5">
            <div className="pt-1">
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
            </div>

            {userDetials?._id && (
              <div className=" cursor-pointer">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="User settings"
                      img={
                        userDetials?.profilePic
                          ? `http://localhost:7800/profilePhotos/${userDetials.profilePic}`
                          : UserLogo
                      }
                      rounded
                    />
                  }
                >
                  <div>
                    <Dropdown.Header>
                      <span className="block text-sm capitalize">
                        {userDetials?.name}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {userDetials?.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                      {userDetials?.role === "ADMIN" && (
                        <Link to={"/admin-panel"}>Dashboard</Link>
                      )}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/profile"}>Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="block lg:hidden bg-primary-light bg-opacity-40 hover:bg-opacity-60 hover:bg-primary-light"
                      onClick={handleLogOut}
                    >
                      <div className="flex justify-center items-center">
                        Sign out
                        <span className="text-lg pl-3 pt-1">
                          <MdOutlineLogout />
                        </span>
                      </div>
                    </Dropdown.Item>
                  </div>
                </Dropdown>
              </div>
            )}
          </div>
          <div className="flex .md:ml-6 gap-1">
            {/* Mobile Search Button */}
            <button
              type="button"
              aria-controls="navbar-search"
              aria-expanded={isMenuOpen}
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
              onClick={toggleMenu}
            >
              <FaSearch className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Search</span>
            </button>
            {/* Desktop Search Input */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaSearch
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                />
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-primary-light rounded-lg bg-orange-50 focus:ring-accent-light focus:border-accent-light dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent-light dark:focus:border-accent-light"
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <MdClose className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MdMenu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {userDetials?._id ? (
            <div className="lg:flex p-1 hidden">
              <button
                onClick={handleLogOut}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-accent-light to-primary-light group-hover:from-accent-light group-hover:to-primary-light hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                <span className="relative px-1.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  LOG OUT
                </span>
              </button>
            </div>
          ) : (
            url.pathname != "/login" && (
              <Link to={"/login"} className="lg:flex p-1 hidden">
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-accent-light to-primary-light group-hover:from-accent-light group-hover:to-primary-light hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                  <span className="relative px-1.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    LOG IN
                  </span>
                </button>
              </Link>
            )
          )}
        </div>
        {/* Mobile Menu & Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-search"
        >
          <div className="relative mt-4 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-accent-light focus:border-accent-light dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent-light dark:focus:border-accent-light"
              placeholder="Search..."
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <ul
            onClick={toggleMenu}
            className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-white bg-primary-light rounded md:bg-transparent md:text-accent-light md:p-0 md:dark:text-primary-light"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-accent-light md:p-0 md:dark:hover:text-accent-light dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-accent-light md:p-0 dark:text-white md:dark:hover:text-accent-light dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li className="block lg:hidden">
              {userDetials?._id ?(<div
                onClick={handleLogOut}
                className="block py-2 px-3 cursor-pointer bg-gray-100 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-accent-light md:p-0 dark:text-white md:dark:hover:text-accent-light dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <div className="flex items-center justify-center">
                  LOG OUT
                  <span className="py-1 pl-3 text-xl">
                    <MdOutlineLogout />
                  </span>
                </div>
              </div>):(url.pathname != "/login"&&(<Link
                to={"/login"}
                className="block py-2 px-3 bg-gray-100 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-accent-light md:p-0 dark:text-white md:dark:hover:text-accent-light dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <div className="flex items-center justify-center">
                  LOG IN
                  <span className="py-1 pl-3 text-xl">
                    <MdOutlineLogin />
                  </span>
                </div>
              </Link>))}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
