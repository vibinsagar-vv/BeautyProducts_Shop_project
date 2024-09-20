import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";
import axios from "axios";
import Context from "../../context/context";

export default function ProductBuyPage() {
  const refelemnt = useRef();
  const context = useContext(Context);
  const [edit, SetEdit] = useState(false);
  const [address, setAddress] = useState("");
  const [newAdress, SetnewAddress] = useState({
    name: "",
    house: "",
    country: "",
    state: "",
    district: "",
    city: "",
    street: "",
    pincode: "",
  });
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
      street: "",
      pincode: "",
    },
    accountDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState("default");
  const [newAddress, setNewAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery");
  const [step, setStep] = useState(1); // State to track the current step
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const fetchUser = async () => {
    const userData = await context.fetchUserDetials();
    SetUser(userData.data);
    console.log(user?.address);
  };
  const proceedToNextStep = () => {
    setStep(step + 1);
  };

  const handleEdit = (e) => {
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    SetEdit(false);
  };
  const handleNewSumit = (e) => {
    console.log("new", newAddress);

    e.preventDefault();
    setAddress(
      `${newAddress?.name},${newAddress?.house},${newAddress?.street},${newAddress?.city},${newAddress?.district},${newAddress?.state},${newAddress?.country},${newAddress?.pincode}`
    );
    setSelectedAddress("default");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("test", name, value);

    setNewAddress((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log("add", newAddress);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setAddress(
        `${user?.name},${user?.address?.house},${user?.address?.street},${user?.address?.city},${user?.address?.district},${user?.address?.state},${user?.address?.country},${user?.address?.pincode}`
      );
      // console.log("address",address)
    }
  }, [user]);

  const handleBuyNow = async () => {
    try {
      const response = await axios.post("/buyProduct", {
        productId: product._id,
        quantity,
        address: selectedAddress === "new" ? newAddress : selectedAddress,
        paymentMethod,
      });
      if (response.status === 200) {
        navigate("/orderSuccess");
      } else {
        console.log("Error in purchasing");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <MyNavbar />
      <div className="min-h-[calc(100vh-64px)] pt-16">
        <div className="container mx-auto p-4 lg:flex lg:gap-4">
          {/* Left Side - Address and Order */}
          <div className="flex-grow">
            {/* User Info */}
            <div className="bg-[#F8C5C1] p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-bold">
                {user?.name} ({user?.email})
              </h2>
            </div>

            {/* Address Section */}
            <div className="bg-white border mb-4 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-bold">Delivery Address</h3>
              {newAddress && (
                <div className="py-3">
                  <span className="mr-4">Default Address</span>
                  <input
                    type="radio"
                    onClick={() =>
                      {setAddress(
                        `${user?.name},${user?.address?.house},${user?.address?.street},${user?.address?.city},${user?.address?.district},${user?.address?.state},${user?.address?.country},${user?.address?.pincode}`
                      )
                    setSelectedAddress("default")}
                    }
                  />
                </div>
              )}
              {selectedAddress === "default" && !newAddress && (
                <p className="font-bold cursor-pointer w-full text-right">
                  <span onClick={() => SetEdit(true)}>Edit</span>
                </p>
              )}
              {selectedAddress === "default" && (
                <form onSubmit={handleEditSubmit}>
                  <div className="mt-4">
                    <div className="relative flex mb-4 items-center justify-between p-4 border rounded-md">
                      {address && <p className="max-w-[400px]">{address}</p>}
                      {/* <p>{`${user?.address?.house}, ${user?.address?.street}, ${user?.address?.city}`}</p> */}
                      <button
                        onClick={proceedToNextStep}
                        className="bg-[#ea9791] text-white px-4 py-2 rounded-md"
                      >
                        Deliver Here
                      </button>
                    </div>
                    {edit && (
                      <div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block mb-1 font-semibold"
                            >
                              Full Name
                            </label>
                            <input
                              required
                              type="text"
                              name="name"
                              value={user?.name || ""}
                              onChange={handleEdit}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="address.house"
                              className="block mb-1 font-semibold"
                            >
                              House Name/No.
                            </label>
                            <input
                              required
                              type="text"
                              name="address.house"
                              value={user?.address?.house || ""}
                              onChange={handleEdit}
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
                              required
                              type="text"
                              name="address.country"
                              value={user?.address?.country || ""}
                              onChange={handleEdit}
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
                              required
                              type="text"
                              name="address.state"
                              value={user?.address?.state || ""}
                              onChange={handleEdit}
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
                              required
                              type="text"
                              name="address.district"
                              value={user?.address?.district || ""}
                              onChange={handleEdit}
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
                              required
                              type="text"
                              name="address.city"
                              value={user?.address?.city || ""}
                              onChange={handleEdit}
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
                              required
                              type="text"
                              name="address.street"
                              value={user?.address?.street || ""}
                              onChange={handleEdit}
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
                              required
                              type="text"
                              name="address.pincode"
                              value={user?.address?.pincode || ""}
                              onChange={handleEdit}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            className="w-full bg-accent-light py-4 my-8 text-white text-xl font-bold rounded"
                            type="submit"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    )}
                    <div
                      onClick={() => setSelectedAddress("new")}
                      className="bg-white cursor-pointer text-accent-light border p-4 rounded-md shadow-md"
                    >
                      <h2 className="text-lg flex items-center font-semibold">
                        <span className="text-3xl pb-10 max-h-3 mr-4 text-center ">
                          +
                        </span>{" "}
                        Add New Address
                      </h2>
                    </div>
                  </div>
                </form>
              )}
              {selectedAddress === "new" && (
                <form onSubmit={handleNewSumit}>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="house"
                          className="block mb-1 font-semibold"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="house"
                          className="block mb-1 font-semibold"
                        >
                          House Name/No.
                        </label>
                        <input
                          type="text"
                          name="house"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block mb-1 font-semibold"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block mb-1 font-semibold"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="district"
                          className="block mb-1 font-semibold"
                        >
                          District
                        </label>
                        <input
                          type="text"
                          name="district"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block mb-1 font-semibold"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="street"
                          className="block mb-1 font-semibold"
                        >
                          Street
                        </label>
                        <input
                          type="text"
                          name="street"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pincode"
                          className="block mb-1 font-semibold"
                        >
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        className="w-full bg-accent-light py-4 my-8 text-white text-xl font-bold rounded"
                        type="submit"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Order Summery */}

            <div className="bg-white border mb-4 p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">2. Order Summary</h2>
              {step >= 2 && (
                <div>
                  <div className="flex justify-between">
                  <div className="mt-4">
                    <p>Product: {product?.ProductName}</p>
                    <p>Price: ₹{product?.sellingPrice}</p>
                  </div>
                  <div className="flex justify-center items-center w-40 h-40 mr-14">
                    <img className="max-h-32 object-scale-down" src={`http://localhost:7800/ProductImages/${product.productImage[0]}`} alt="" />
                  </div>
                  </div>
                  <button
                    className="bg-[#ea9791] text-white px-6 py-2 mt-4 rounded-full font-semibold"
                    onClick={proceedToNextStep}
                  >
                    Proceed to Payment Options
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white border mb-4 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-bold">Payment Method</h3>
              {step >= 3 && (
                <div>
                  <div className="flex gap-4 mt-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CashOnDelivery"
                        checked={paymentMethod === "CashOnDelivery"}
                        onChange={() => setPaymentMethod("CashOnDelivery")}
                      />
                      <span className="ml-2">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="OnlinePayment"
                        checked={paymentMethod === "OnlinePayment"}
                        onChange={() => setPaymentMethod("OnlinePayment")}
                      />
                      <span className="ml-2">Online Payment</span>
                    </label>
                  </div>
                  <button
                    className="bg-[#ea9791] text-white px-6 py-2 mt-4 rounded-full font-semibold"
                    onClick={proceedToNextStep}
                  >
                    Proceed
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Price Summary */}
          <div className="lg:w-1/3 lg:max-h-[260px] lg:sticky top-20 bg-white p-4 border rounded-md shadow-md">
            <div>
              <h3 className="text-lg font-bold mb-4">Price Details</h3>
              <div className="flex justify-between py-2 border-b">
                <p>Price (1 item)</p>
                <p>{product.sellingPrice}</p>
              </div>
              <div className="flex justify-between py-2 border-b">
                <p>Delivery Charges</p>
                <p className="text-green-600">FREE</p>
              </div>
              <div className="flex justify-between py-2 border-b">
                <p>Platform Fee</p>
                <p>₹3</p>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <p>Total Payable</p>
                <p>{product.sellingPrice + 3}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Buttons */}
        <div className="container mx-auto p-4 flex justify-between">
          {step >= 4 && (
            <button
              onClick={handleBuyNow}
              className="bg-[#ea9791] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#a26865]"
            >
              Buy Now
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="border-2 border-[#B76E79] text-[#B76E79] px-6 py-2 rounded-md font-semibold hover:bg-[#B76E79] hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
