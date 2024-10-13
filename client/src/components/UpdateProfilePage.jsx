import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";
import Heading from "../helpers/Heading";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateProfilePage() {
  const context = useContext(Context);
  const [user, SetUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: {
      house: "",
      country: "",
      state: "",
      district: "",
      city: "",
      street:"",
      pincode: "",
    },
    accountDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
  });

  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const userData = await context.fetchUserDetials();
    SetUser(userData.data);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("test", name, value);

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      SetUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value,
        },
      }));
    } else if (name.includes("accountDetails.")) {
      const accountField = name.split(".")[1];
      SetUser((prevUser) => ({
        ...prevUser,
        accountDetails: {
          ...prevUser.accountDetails,
          [accountField]: value,
        },
      }));
    } else {
      SetUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const resData = await axios.post(
        `http://localhost:7800/user/update-profile`,
        { user },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(resData);
      
      if (resData.data.success) {
        console.log(resData.data);
        
        toast.success(resData.data.message);
      }
      if (resData.data.error) {
        toast.error(resData.data.message);
      }

      // setLoading(false);
      navigate("/profile");
    } catch (error) {
      console.log(error);

      // setLoading(false);
    }
  }
  // console.log("user", user?.address);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-full">
        <Heading text={"Update Profile"} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                disabled
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-1 font-semibold">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block mb-1 font-semibold">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block mb-1 font-semibold">
                Gender
              </label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="group w-full p-2 border rounded"
              >
                
                <option value="male"  >Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option className="group-focus:hidden" selected >select Gender</option>
              </select>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <div className="text-lg text-center bg-primary-light py-2 mt-16 rounded-xl font-semibold mb-6">Address</div>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label
                  htmlFor="address.house"
                  className="block mb-1 font-semibold"
                >
                  House Name/No.
                </label>
                <input
                  type="text"
                  name="address.house"
                  value={user?.address?.house || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="address.country"
                  className="block mb-1 font-semibold"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  value={user?.address?.country || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="address.state"
                  className="block mb-1 font-semibold"
                >
                  State
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={user?.address?.state || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="address.district"
                  className="block mb-1 font-semibold"
                >
                  District
                </label>
                <input
                  type="text"
                  name="address.district"
                  value={user?.address?.district || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="address.city"
                  className="block mb-1 font-semibold"
                >
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={user?.address?.city || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="address.street"
                  className="block mb-1 font-semibold"
                >
                  Street
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={user?.address?.street || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="address.pincode"
                  className="block mb-1 font-semibold"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  name="address.pincode"
                  value={user?.address?.pincode || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="space-y-4">
            <div className="text-lg text-center bg-primary-light py-2 mt-16 rounded-xl font-semibold mb-6">Account Details</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="accountDetails.accountNumber"
                  className="block mb-1 font-semibold"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountDetails.accountNumber"
                  value={user?.accountDetails?.accountNumber || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="accountDetails.bankName"
                  className="block mb-1 font-semibold"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  name="accountDetails.bankName"
                  value={user?.accountDetails?.bankName || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="accountDetails.ifscCode"
                  className="block mb-1 font-semibold"
                >
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="accountDetails.ifscCode"
                  value={user?.accountDetails?.ifscCode || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-accent-light text-lg w-full py-3 max-w-2xl mt-16 text-white font-bold px-4 rounded-full hover:bg-primary-dark"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
