import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import AXIOS from "axios";
import { toast } from "react-toastify";

export default function ChangeUserRole({
  name,
  email,
  role,
  onClose,
  userid,
  callFun,
  deleteFun,
}) {
  const header = {
    token: localStorage.getItem("token") || "",
  };
  const [userRole, SetUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    SetUserRole(e.target.value);
    console.log(e.target.value);
  };
  const updateUserRole = async () => {
    const resData = await AXIOS.post(
      "https://zenglow-server.onrender.com/user/update-user",
      { role: userRole, userid: userid },
      { headers: header }
    );

    console.log("role updated", resData.data);
    if (resData.data.success) {
      toast.success(resData.data.message);
      onClose();
      callFun();
    }
    if (resData.data.error) {
      toast.error(resData.data.message);
      onClose();
      callFun();
    }
  };
  return (
    <div className="absolute w-full h-full z-10 flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-50">
      <div className="w-full mx-auto rounded bg-white shadow-md p-4 max-w-sm">
        <button
          className="block ml-auto text-2xl hover:text-pink-900 cursor-pointer"
          onClick={onClose}
        >
          <IoIosCloseCircle />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role :</p>
          <select
            className="border px-4 py-1"
            name=""
            id=""
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            <option className="hover:bg-pink-500" value="ADMIN">
              Admin
            </option>
            <option value="GENERAL">General</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-700 text-white hover:bg-red-800"
            onClick={deleteFun}
          >
            Remove User
          </button>
          <button
            className="w-fit mx-auto block py-1 px-3 rounded-full bg-pink-700 text-white hover:bg-pink-800"
            onClick={updateUserRole}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
}
