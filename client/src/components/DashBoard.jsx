import React, { useState,useContext, } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AllUsers from "./pages/Admin/AllUsers";
import AllProducts from "./pages/Admin/AllProducts";
import BannerUpdate from "./pages/Admin/Banner/BannerUpdate";
// import CustomerTable from "./Customers";
import UsersTable from "./Customers";
import Logo from "../assest/logo/Logo.png";
import ProductsTable from "./pages/Admin/ProductsTable";
import { FaUsers } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import AdminMonthlyOrderChart from "./MonthlyOrderChart";
import DashBoardHome from "./pages/DashBoardHome"
import UserLogo from "../assest/logo/UserLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetials } from "../store/userSlice";
import Context from "../context/context";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import PaymentTable from "./paymentTable";


export default function DashBoard() {
  const userDetials = useSelector((state) => state?.user?.user);
  // console.log('userhead',user);
  const dispatch = useDispatch();

  const context = useContext(Context);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen pt-16">
      <nav className="fixed shadow-md h-16 top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center h-full">
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a href="/" className="flex items-center min-h-full py-2">
                <img
                  src={Logo}
                  className="flex items-center w-28 md:w-36 rounded-md mr-5"
                  alt="Main Logo"
                />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
              <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="User settings"
                      img={
                        userDetials?.profilePic
                          ? `http://localhost:8200/profilePhotos/${userDetials.profilePic}`
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
                    {userDetials?.role === "ADMIN" && (
                      <Dropdown.Item>
                        <Link className="w-full flex" to={"/"}>
                          WebSite
                        </Link>
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item>
                      <Link className="w-full flex" to={"/profile"}>
                        Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="block lg:hidden bg-primary-light bg-opacity-40 hover:bg-opacity-60 hover:bg-primary-light"
                      onClick={()=>handleLogOut(userDetials?.email)}
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
            </div>
          </div>
        </div>
      </nav>
      <div
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        className="min-h-[calc(100vh-64px)] flex relative w-full"
      >
        <aside
          id="logo-sidebar"
          className={`fixed pt-10 left-0 z-40 w-64 h-full transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-tertiary-dark border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-gray-800">
            <ul className="space-y-2 font-medium text-white">
              {/* Menu items */}
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-tertiary-dark"
                >
                  <svg
                    className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              {/* Add more menu items as needed */}
              <li>
                <Link
                  to={"all-users"}
                  className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-tertiary-dark"
                >
                  <span className="w-5 h-5 mr-3 text-center flex items-center text-2xl text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <FaUsers />
                  </span>
                  All Users
                </Link>
              </li>
              <li>
                <Link
                  to={"products"}
                  className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-tertiary-dark"
                >
                  <span className="w-5 h-5 mr-3 text-center flex items-center text-2xl text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <GiShoppingBag />
                  </span>
                  products
                </Link>
              </li>
              <li>
                <Link
                  to={"banners"}
                  className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-tertiary-dark"
                >
                  Banners
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <main className=" w-full min-h-full px-4 bg-white lg:ml-64 overflow-hidden scrollbar-none">
          <Routes>
            <Route path="/" element={<DashBoardHome />} />
            <Route path="/all-users" element={<UsersTable />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/banners" element={<BannerUpdate />} />
            <Route path="/sales" element={<PaymentTable/>}/>
          </Routes>
        </main>
      </div>
    </div>
  )
}
