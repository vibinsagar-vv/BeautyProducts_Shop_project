import React, { useEffect, useState } from "react";
import AXIOS from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../../ChangeUserRole";

export default function AllUsers() {
  const [allUsers, SetAllUsers] = useState([]);
  const [openUpdateUser, SetOpenUpdateUser] = useState(false);
  const [updateUserDetials, SetUpdateUserDetials] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const header = {
    token: localStorage.getItem("token") || "",
  };
  const fectchAllUsers = async () => {
    const resData = await AXIOS.post(
      "http://localhost:8200/user/all-user",
      {},
      { headers: header }
    );
    console.log(resData);

    if (resData.data.success) {
      SetAllUsers(resData.data.data);
    }

    if (resData.data.error) {
      toast.error(resData.data.message);
    }
  };

  useEffect(() => {
    fectchAllUsers();
  }, []);
  return (
    <div className="pb-4 bg-white">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-pink-900 text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user.createdAt).format("ll")}</td>
                <td>
                  <button
                    className="bg-green-100 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      SetUpdateUserDetials(user);
                      SetOpenUpdateUser(true);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateUser && (
        <ChangeUserRole
          onClose={() => {
            SetOpenUpdateUser(false);
          }}
          name={updateUserDetials.name}
          email={updateUserDetials.email}
          role={updateUserDetials.role}
          userid={updateUserDetials._id}
          callFun={fectchAllUsers}
        />
      )}
    </div>
  );
}
