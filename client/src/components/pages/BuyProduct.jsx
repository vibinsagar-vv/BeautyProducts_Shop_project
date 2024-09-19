import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";
import axios from "axios";
import Context from "../../context/context";

export default function ProductBuyPage() {
    const context = useContext(Context);
    const [user, SetUser] = useState({});
  

    const fetchUser = async () => {
        const userData = await context.fetchUserDetials();
        SetUser(userData.data);
      };
    
      useEffect(() => {
        fetchUser();
      }, []);
  const location = useLocation(); // Access the passed product data
  const product = location.state?.product; // Get the product from state

  const [quantity, setQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState("default");
  const [newAddress, setNewAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery");
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };
console.log('1',user);

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
        <div className="container mx-auto p-4">
          {/* Product Details */}
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            {/* product image */}
            <div className="h-96 flex">
              <img
                src={`http://localhost:7800/ProductImages/${product.productImage[0]}`}
                alt={product.ProductName}
                className="h-full w-full object-scale-down"
              />
            </div>
            {/* product detial */}
            <div>
              <h2 className="text-2xl font-bold">{product.ProductName}</h2>
              <p className="text-lg font-medium text-slate-600">Price: {product.sellingPrice}</p>
            </div>
          </div>

          {/* Address Selection */}
          <div className="my-6">
            <h3 className="text-lg font-semibold">Select Address</h3>
            <select
              className="border-2 border-primary px-4 py-2 rounded-full"
              value={selectedAddress}
              onChange={handleAddressChange}
            >
              <option value="default">Default Address</option>
              <option value="new">Add New Address</option>
            </select>
            {selectedAddress === "default" &&(
                 <div className="w-full max-w-md my-8  rounded-md px-6">
                    <div className="grid grid-cols-2 gap-4">
                 <div className="text-right">
                   <strong>Address:</strong>
                 </div>
                 <div className="flex bg-gray-100 px-5 py-3 border rounded-md flex-wrap overflow-ellipsis max-w-52">{user && (`${user?.address?.house}, ${user?.address?.street}, ${user?.address?.city}, ${user?.address?.district}, ${user?.address?.state}, ${user?.address?.country}, ${user?.address?.pincode}`)}</div>
                 </div>
                 </div>
            )}

            {selectedAddress === "new" && (
              <input
                type="text"
                className="mt-2 border-2 border-accent-light px-4 py-2 rounded-full w-full"
                placeholder="Enter new address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            )}
          </div>

          {/* Quantity Selection */}
          <div className="my-6">
            <h3 className="text-lg font-semibold">Select Quantity</h3>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border-2 border-secondary px-4 py-2 rounded-full"
            />
          </div>

          {/* Payment Method Selection */}
          <div className="my-6">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="CashOnDelivery"
                checked={paymentMethod === "CashOnDelivery"}
                onChange={() => setPaymentMethod("CashOnDelivery")}
              />
              Cash on Delivery
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="paymentMethod"
                value="OnlinePayment"
                checked={paymentMethod === "OnlinePayment"}
                onChange={() => setPaymentMethod("OnlinePayment")}
              />
              Online Payment
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBuyNow}
              className="bg-[#ea9791] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#a26865]"
            >
              Buy Now
            </button>
            <button
              onClick={() => navigate(-1)}
              className="border-2 border-[#B76E79] text-[#B76E79] px-6 py-2 rounded-full font-semibold hover:bg-[#B76E79] hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
