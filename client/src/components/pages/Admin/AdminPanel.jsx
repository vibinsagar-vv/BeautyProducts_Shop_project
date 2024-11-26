import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AllUsers from "./AllUsers";
import AllProducts from "./AllProducts";
import AXIOS from "axios";
import BannerUpdate from "./Banner/BannerUpdate";
import SidebarComponent from "../../SideBarFlowbite";

export default function AdminPanel() {
  const user = useSelector((state) => state.user.user);
  const Role = localStorage.getItem("role");
  const nav = useNavigate();
  async function CheckAuth() {
    const resData = await AXIOS.get("http://localhost:8200/user/checkauth", {
      headers: { token: localStorage.getItem("token") },
    });
    if (resData.data.error) {
      nav("/");
    }

    if (Role !== "ADMIN") {
      nav("/");
    }
  }
  useEffect(() => {
    CheckAuth();
  }, [user]);

  return (
    <div className="min-h-[100vh]] md:flex">
      {/* <aside className='bg-red-200 min-h-full w-full max-w-60 customShadow'> */}
      <SidebarComponent />
      {/* <div className='h-52 flex justify-center items-center flex-col'>
                <div className='rounded-full shadow-pink-800 shadow-lg text-7xl text-pink-700 cursor-pointer flex justify-center'>
                            {
                                user?.profilePic?(<img className='w-20 h-20 rounded-full' src={`http://localhost:8200/profilePhotos/${user.profilePic}`} alt={user.name}/>):(
                                    <FaUserCircle/>
                                )
                            }
                            
                </div>
                <p className='capitalize text-2xl font-semibold py-2 cursor-pointer'>{(user?.name)?.toUpperCase()}</p>
                <p className='text-[12px] cursor-pointer'>{user?.role}</p>
            </div>
            <div>
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-2 py-1 hover:bg-pink-100'>All Users</Link>
                    <Link to={"products"} className='px-2 py-1 hover:bg-pink-100'>products</Link>
                    <Link to={"banners"} className='px-2 py-1 hover:bg-pink-100'>Banners</Link>
                </nav>
            </div> */}
      {/* </aside> */}
      <main className="bg-green-500 w-full h-[100vh] overflow-hidden">
        <Routes>
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/banners" element={<BannerUpdate />} />
        </Routes>
      </main>
    </div>
  );
}
