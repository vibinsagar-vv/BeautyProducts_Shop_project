import React, { useState, useEffect, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import ChangeProfilePic from "../../helpers/ChangeProfilePic";
import Context from "../../context/context";
import Heading from "../../helpers/Heading";
import ProfileDetials from "../ProfileDetials";
import UpdateProfilePage from "../UpdateProfilePage";

export default function ProfilePage() {
  const context = useContext(Context);
  const [user, SetUser] = useState({});
  const [openChangePic, SetOpenChangePic] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchUser = async () => {
    const userData = await context.fetchUserDetials();
    SetUser(userData.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="min-h-screen pt-16">
        <button
          onClick={toggleSidebar}
          aria-controls="logo-sidebar"
          className="inline-flex fixed z-50 top-16 items-center p-2 text-sm text-black rounded-lg md:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            } bg-primary-light border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-gray-800">
              <div className="h-52 flex justify-center items-center flex-col">
                <div className="rounded-full shadow-accent-light shadow-lg text-7xl text-white cursor-pointer flex justify-center">
                  {user?.profilePic ? (
                    <img
                      className="w-20 h-20 rounded-full"
                      src={`http://localhost:7800/profilePhotos/${user.profilePic}`}
                      alt=""
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
                <p className="capitalize text-2xl font-semibold py-2 cursor-pointer">
                  {user?.name?.toUpperCase()}
                </p>
                <p className="text-[12px] mb-8 cursor-pointer">{user?.role}</p>
                <a
                  onClick={() => SetOpenChangePic(true)}
                  className="text-[12px] underline text-white hover:text-blue-400 cursor-pointer"
                >
                  Change profile picture
                </a>
              </div>

              <div className=" px-3 pb-4 mt-8  bg-transparent dark:bg-gray-800">
            <ul className="space-y-4 text-lg font-medium text-center text-gray-600">
              {/* Menu items */}
              <li>
                <span></span>
               <Link to={"/profile"} className="flex items-center justify-center p-2 rounded-lg dark:text-gray-400 border-b-4 hover:bg-accent-light dark:hover:bg-gray-700 group hover:text-white">Profile</Link>
              </li>
              
              {/* Add more menu items as needed */}
              <li>
                <span></span>
               <Link to={"/wishlist"} className="flex items-center justify-center p-2 rounded-lg dark:text-gray-400 border-b-4 hover:bg-accent-light dark:hover:bg-gray-700 group hover:text-white">My Wishlist</Link>
              </li>
              <li>
                <span></span>
               <Link to={"/cart"} className="flex items-center justify-center p-2 rounded-lg dark:text-gray-400 border-b-4 hover:bg-accent-light dark:hover:bg-gray-700 group hover:text-white">My Cart</Link>
              </li>
            </ul>
          </div>
            </div>
          </aside>

          <main className="w-full min-h-full px-4 bg-white lg:ml-64 overflow-hidden flex justify-center items-center">
            <Routes>
                <Route path="/" element={<ProfileDetials/>}/>
                <Route path="/update-profile" element={<UpdateProfilePage/>}/>
            </Routes>
          </main>
        </div>
      </div>
      {openChangePic && (
        <ChangeProfilePic
          user={user}
          callfun={fetchUser}
          onClose={() => {
            SetOpenChangePic(false);
          }}
        />
      )}
    </div>
  );
}

