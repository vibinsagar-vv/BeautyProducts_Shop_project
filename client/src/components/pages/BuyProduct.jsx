import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import logo from "../../assest/logo/logoIcon.png";
import Footer from "../Footer";
import axios from "axios";
import Context from "../../context/context";
import { toast } from "react-toastify";
import sucessImg from "../../assest/icons/successful.png";
import FailImg from "../../assest/icons/cancel.png";
import { FaArrowRight } from "react-icons/fa";
import displayINRCurrency from "../../helpers/displayCurrency";

export default function ProductBuyPage() {
  const refelemnt = useRef();
  const [popUp, setpopUp] = useState(false);
  const context = useContext(Context);
  const [edit, SetEdit] = useState(false);
  const [currentUser, SetCurrentUser] = useState({
    name: "",
    email: "",
  });

  const [editAddress, setEditAddress] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    altphoneNumber: "",
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
  const [user, SetUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    altphoneNumber: "",
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
  const [isSucess, setIsSucess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery");
  const [step, setStep] = useState(1); // State to track the current step
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [from,setFrom] =useState('')
  // const product = location.state?.product;

  const startEdit = () => {
    SetEdit(true);
    setEditAddress({ ...user }); // Copy the original address to the edit state
    console.log("123", product);
  };

  const updateuser = async (e) => {
    e.preventDefault();
    const resData = await axios.post(
      `http://localhost:8200/user/update-adress`,
      { user },
      { headers: { token: localStorage.getItem("token") } }
    );
    toast.success(resData.data.message);
    setpopUp(false);
  };

  const handleEditAddressChange = (e) => {
    const { name, value } = e.target;
    console.log("test", name, value);

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setEditAddress((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value,
        },
      }));
    } else if (name.includes("accountDetails.")) {
      const accountField = name.split(".")[1];
      setEditAddress((prevUser) => ({
        ...prevUser,
        accountDetails: {
          ...prevUser.accountDetails,
          [accountField]: value,
        },
      }));
    } else {
      setEditAddress((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const changeAddressSubmit = (e) => {
    e.preventDefault();
    SetUser((prevUser) => ({
      ...editAddress,
    }));
    SetEdit(false); // Exit edit mode
    toast.success("Address updated successfully!");
  };

  const fetchUser = async () => {
    const userData = await context.fetchUserDetials();
    SetUser(userData.data);
    SetCurrentUser({ name: userData.data.name, email: userData.data.email });
    setProduct(location.state?.product);
    setFrom(location.state?.from)
  };
  console.log("1111", product);

  useEffect(() => {
    fetchUser();
  }, []);

  // const handleBuyNow = async () => {
  //   try {
  //     const response = await axios.post("/buyProduct", {
  //       productId: product._id,
  //       quantity,
  //       data: user,
  //       paymentMethod,
  //     });
  //     if (response.status === 200) {
  //       navigate("/orderSuccess");
  //     } else {
  //       console.log("Error in purchasing");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  let TotalQty;
  if (from=='buyNow') {
    TotalQty = quantity;
  } else {
    TotalQty = product.reduce((prev, curr) => {
      console.log(curr);

      return prev + parseInt(curr.Quantity);
    }, 0);
  }

  let TotalPrice;
  if (from=='buyNow') {
    TotalPrice = product[0].ProductId.sellingPrice * quantity;
  } else {
    TotalPrice = product.reduce((prev, curr) => {
      console.log(curr);

      return prev + parseInt(curr.Quantity * curr.ProductId.sellingPrice);
    }, 0);
  }
  console.log("888", TotalPrice);

  let amount = (TotalPrice + 3) * 100; // Set amount in paise for ₹500
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8200/products/order",
        {
          products: product,
          user: user,
          amount,
          currency,
          receipt: receiptId,
          quantity: TotalQty,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      const order = await response.data;
      console.log("10", order);

      if (!order.id) throw new Error("Order creation failed");

      const options = {
        key: "rzp_test_G0q4GHafjeesTR", // Enter your Razorpay Key ID
        amount: amount, // Amount is in currency subunits (paise)
        currency: currency,
        name: "Zenglow",
        description: "Test Transaction",
        image: logo,
        order_id: order.id, // This is the order ID returned from the server
        handler: async function (response) {
          const validateRes = await axios.post(
            "http://localhost:8200/products/order_validate",
            {
              data: response,
              products: product,
              user: user,
              amount,
              currency,
              from,
              receipt: receiptId,
              quantity: TotalQty,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonRes = await validateRes.data;
          if (jsonRes.success) {
            setIsSucess(true);
          } else {
            setIsFail(true);
          }
        },
        prefill: {
          email: currentUser.email,
          contact: user.phoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        setIsSucess(true);
        setIsFail(true);
        console.error("Error:", response.error);
      });

      rzp1.open();
    } catch (error) {
      console.log(error);
      setIsSucess(true);
      setIsFail(true);
      console.error("Payment initiation error:", error);
      alert("Oops! Something went wrong. Payment Failed");
    }
  };

  return (
    <div>
      <div>
        <div className="min-h-[calc(100vh-64px)] pt-16">
          <div className="container mx-auto p-4 lg:flex lg:gap-4">
            {/* Left Side - Address and Order */}
            <div className="flex-grow">
              {/* User Info */}
              <div className="bg-[#F8C5C1] p-4 rounded-md shadow-md mb-4">
                <h2 className="text-lg font-bold">
                  {currentUser?.name} ({currentUser?.email})
                </h2>
              </div>

              {/* Address Section */}
              <div className="bg-white border mb-4 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold">Delivery Address</h3>

                {/* Display the current address */}
                {user.address ? (
                  <div className="mt-4">
                    <div className="relative md:flex mb-4 items-center justify-between p-4 border rounded-md">
                      <p className="flex-wrap text-wrap flex-col md:w-[400px] md:max-w-[400px]">
                        <p className="capitalize">{`${user?.name},`}</p>
                        <span className="capitalize">{`${user.address.house}, ${user.address.street}, ${user.address.city}, ${user.address.district}, ${user.address.state}, ${user.address.country} - ${user.address.pincode}`}</span>
                        {user?.address?.landmark && (
                          <p>{`Mob:${user?.address.landmark}`}</p>
                        )}
                        <p className="">{`Email:${user?.email}`}</p>
                        <p>{`Mob:${user?.phoneNumber}`}</p>
                        {user?.altphoneNumber && (
                          <p>{`Mob:${user?.altphoneNumber}`}</p>
                        )}
                      </p>
                      <button
                        onClick={()=>setStep(2)}
                        className="bg-[#ea9791] text-white px-4 py-2 mt-3 md:mt-0 rounded-md"
                      >
                        Deliver Here
                      </button>
                    </div>

                    {/* Edit Address button */}
                    {!edit && (
                      <div
                        onClick={startEdit} // Start editing address
                        className="bg-white cursor-pointer text-accent-light border p-4 rounded-md shadow-md"
                      >
                        <h2 className="text-lg flex items-center font-semibold">
                          Edit Address
                        </h2>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={startEdit} // Start editing address
                    className="bg-white cursor-pointer text-accent-light border mt-2 p-4 rounded-md shadow-md"
                  >
                    <h2 className="text-lg flex items-center font-semibold">
                      + Add Address
                    </h2>
                  </div>
                )}

                {/* Edit Address Form */}
                {edit && (
                  <form onSubmit={changeAddressSubmit} className="mt-5">
                    <div>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-1 font-semibold"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={editAddress?.name}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* House Name/No */}
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
                            value={editAddress?.address?.house}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* Country */}
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
                            value={editAddress?.address?.country}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* State */}
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
                            value={editAddress?.address?.state}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* District */}
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
                            value={editAddress?.address?.district}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* City */}
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
                            value={editAddress?.address?.city}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* Street */}
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
                            value={editAddress?.address?.street}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* Pincode */}
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
                            value={editAddress?.address?.pincode}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-1 font-semibold"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={editAddress?.email}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-1 font-semibold"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={editAddress?.phoneNumber}
                            onChange={handleEditAddressChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-2">
                          <button
                            onClick={() => {
                              if (!user?.address) {
                                setpopUp(true);
                              }
                            }}
                            className="w-full bg-accent-light py-4 my-8 text-white text-xl font-bold rounded"
                            type="submit"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Order Summery */}

              <div className="bg-white border mb-4 p-4 rounded-md shadow-md">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  {from=='cart' && step >= 2 && (
                    <button
                      onClick={() => {
                        navigate("/cart");
                      }}
                      className="border border-gray-300 text-gray-700 px-2 shadow-md rounded"
                    >
                      Edit
                    </button>
                  )}
                </div>
                {step >= 2 && (
                  <div>
                    {product.map((products) => {
                      return (
                        <div className="flex justify-between">
                          <div className="mt-4">
                            <p>Product: {products?.ProductId?.ProductName}</p>
                            <p>Price: ₹{products?.ProductId?.sellingPrice}</p>
                            {from=='buyNow' ? (
                              <div className="flex items-center gap-3 mt-2">
                                {quantity > 1 && (
                                  <button
                                    className="border-2 border-pink-800 font-extrabold text-pink-700 hover:bg-pink-800 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                                    onClick={() =>
                                      setQuantity((pre) => pre - 1)
                                    }
                                  >
                                    -
                                  </button>
                                )}
                                <span className="font-medium">{quantity}</span>
                                {products?.ProductId?.quantity > quantity && (
                                  <button
                                    className="border-2 border-pink-800 font-extrabold text-pink-700 hover:bg-pink-800 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                                    onClick={() =>
                                      setQuantity((pre) => pre + 1)
                                    }
                                  >
                                    +
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span className="font-medium">
                                Quantity : {products?.Quantity}
                              </span>
                            )}
                          </div>

                          <div className="flex justify-center items-center w-40 h-40 mr-14">
                            <img
                              className="max-h-32 object-scale-down"
                              src={`http://localhost:8200/ProductImages/${products?.ProductId?.productImage[0]}`}
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className="bg-[#ea9791] text-white px-6 py-2 mt-4 rounded-full font-semibold"
                      onClick={()=>setStep(3)}
                    >
                      Proceed to Payment
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Price Summary */}
            {step >= 3 && (
              <div className="lg:w-1/3 lg:max-h-[260px] lg:sticky top-20 bg-white p-4 border rounded-md shadow-md">
                <div>
                  <h3 className="text-lg font-bold mb-4">Price Details</h3>

                  <div className="flex justify-between py-2 border-b">
                    <p>Price {`(${TotalQty} items)`}</p>
                    <p>{displayINRCurrency(TotalPrice)}</p>
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
                    {displayINRCurrency(TotalPrice + 3)}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Footer Buttons */}
          <div className="container mx-auto p-4 flex justify-between">
            {step >= 3 && (
              <button
                onClick={paymentHandler}
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
        {popUp && (
          <div className="fixed top-0 flex pt-60 justify-center min-w-full min-h-[100vh] bg-slate-100 bg-opacity-70 ">
            <div className="w-72 max-h-48 mx-auto p-10 bg-white border rounded-2xl">
              <h1 className="mb-2">
                Do you want to set this as "Home Adress" ?
              </h1>
              <div className="flex justify-between">
                <button
                  className="bg-green-600 text-white px-3 py-1 m-4"
                  onClick={updateuser}
                >
                  Yes
                </button>
                <button
                  onClick={() => setpopUp(false)}
                  className="bg-red-600 text-white px-3 py-1 m-4"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isSucess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-4xl text-center">
            <h2 className="text-4xl font-bold text-rose-600 mb-4">
              {isFail ? "Payment Failed" : "Payment Successfull"}
            </h2>
            <p className="text-gray-700 mb-6">
              {isFail
                ? "Order not Placed"
                : "Your order has been placed successfully!"}
            </p>
            <div className="flex justify-center w-full">
              <img
                className="w-28 h-28 mb-6 flex justify-center"
                src={isFail ? FailImg : sucessImg}
                alt="sucess"
              />
            </div>
            <div className="flex justify-between">
              {!isFail && (
                <button
                  onClick={() => {navigate("/profile/my_orders")
                    navigate(0)
                  }}
                  className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition"
                >
                  View Orders
                </button>
              )}
              <a
                href="/"
                onClick={()=>navigate(0)}
                className="text-pink-700 flex items-center text-center px-4 py-2 rounded transition"
              >
                {" Continue Shopping"}
                <span className="flex items-center text-center pt-2 ml-2">
                  <FaArrowRight />
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
