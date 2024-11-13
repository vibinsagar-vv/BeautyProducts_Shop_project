import React, { useContext, useEffect, useState } from "react";
import AXIOS from "axios";
import displayINRCurrency from "../../helpers/displayCurrency";
import { IoMdClose } from "react-icons/io";
import Context from "../../context/context";
import MyNavbar from "../flowbiteHeader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaUser,
  FaClipboardList,
  FaRegCheckSquare,
} from "react-icons/fa";

export default function OrderDetial() {
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});
  const context = useContext(Context);
  const nav = useNavigate();
  const location = useLocation();
  const steps = [
    {
      title: "Personal Info",
      details: "Step details here",
      icon: FaCheck,
      color: "text-green-500 bg-green-200",
    },
    {
      title: "Account Info",
      details: "Step details here",
      icon: FaUser,
      color: "text-gray-500 bg-gray-100",
    },
    {
      title: "Review",
      details: "Step details here",
      icon: FaClipboardList,
      color: "text-gray-500 bg-gray-100",
    },
    {
      title: "Confirmation",
      details: "Step details here",
      icon: FaRegCheckSquare,
      color: "text-gray-500 bg-gray-100",
    },
  ];
  // const TotalQty = data.reduce((prev, curr) => {
  //   console.log(curr);

  //   return prev + parseInt(curr.Quantity);
  // }, 0);

  // const TotalPrice = data.reduce((prev, curr) => {
  //   console.log(curr);

  //   return prev + parseInt(curr.Quantity * curr.ProductId.sellingPrice);
  // }, 0);

  // const handleBuy = () => {
  //   console.log("66",data);

  //   nav("/buy", { state: { product: data } });
  // };
  console.log(product, order, "31");

  useEffect(() => {
    setProduct(location?.state?.product);
    setOrder(location?.state?.order);
  }, []);

  // const handleDeleteCartPrduct = async (id) => {
  //   const resData = await AXIOS.post(
  //     "http://localhost:7800/user/delete-cart-product",
  //     { _id: id },
  //     { headers: { token: localStorage.getItem("token") || "" } }
  //   );

  //   if (resData.data.success) {
  //     fetchData();
  //     context.fetchUserAddToCart();
  //   }
  // };

  // const increaseQty = async (id, qty) => {
  //   const resData = await AXIOS.post(
  //     "http://localhost:7800/user/update-cart",
  //     { Quantity: qty + 1, Id: id },
  //     { headers: { token: localStorage.getItem("token") || "" } }
  //   );

  //   if (resData.data.success) {
  //     fetchData();
  //   }
  // };
  // const decreaseQty = async (id, qty) => {
  //   if (qty > 1) {
  //     const resData = await AXIOS.post(
  //       "http://localhost:7800/user/update-cart",
  //       { Quantity: qty - 1, Id: id },
  //       { headers: { token: localStorage.getItem("token") || "" } }
  //     );
  //     if (resData.data.success) {
  //       fetchData();
  //     }
  //   }
  // };

  return (
    <div className="container pt-24 p-12 bg-primary-light bg-opacity-50 flex items-center min-w-full justify-center min-h-[100vh]">
      <div className=" md:w-full">
        <div className="mx-auto p-6 md:p-0 flex flex-col md:flex-row text-white max-w-4xl w-4xl bg-accent-dark bg-opacity-80 rounded-lg shadow-2xl shadow-black border-2 border-accent-dark">
          <div>
            <h1 className="text-xs md:text-sm p-3 capitalize">
              Order Id: {order?.order_id}
            </h1>
            <div className="flex">
              <div className="p-4 flex items-center">
                <div className="flex items-center justify-center  w-[105px] h-[105px] md:w-40 md:h-40 md:p-1 mr-2 ">
                  <img
                    src={`http://localhost:7800/ProductImages/${product?.ProductId?.productImage[0]}`}
                    alt=""
                    className="w-full h-full object-scale-down"
                  />
                </div>
              </div>
              <div className="p-4 flex border-l-[1px] flex-col gap-2">
                <h1 className="md:text-3xl text-xl capitalize font-semibold">
                  {product?.ProductId?.ProductName}
                </h1>
                <h1 className="md:text-lg text-sm opacity-75 capitalize">
                  Price: {displayINRCurrency(product?.ProductId?.sellingPrice)}
                </h1>
                <h1 className="md:text-lg text-sm opacity-75 capitalize">
                  Purchased Quantity: {product?.Quantity} Nos
                </h1>
                <h1 className="md:text-lg text-sm opacity-75 capitalize">
                  Total Price:{" "}
                  {displayINRCurrency(
                    product?.ProductId?.sellingPrice * product?.Quantity
                  )}
                </h1>
              </div>
            </div>
            <div className="p-3">
              <h1 className="md:text-2xl text-xl mb-2 capitalize font-semibold">
                Delivery Address
              </h1>
              <div className="w-[250px] opacity-75">
                <p className="flex-wrap text-wrap flex-col md:w-[400px] md:max-w-[400px]">
                  <span className="capitalize text-sm md:text-base">{`${order?.address?.house}, ${order?.address?.street}, ${order?.address?.city}, ${order?.address?.district}, ${order?.address?.state}, ${order?.address?.country} - ${order?.address?.pincode}`}</span>
                  <p>{`Mob:${order?.mobilenumber}`}</p>
                </p>
              </div>
            </div>
          </div>
          <div>
            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
              {steps.map((step, index) => (
                <li key={index} className="mb-10 ml-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 ${step.color}`}
                  >
                    <step.icon className="w-4 h-4" />
                  </span>
                  <h3 className="font-medium leading-tight">{step.title}</h3>
                  <p className="text-sm">{step.details}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
