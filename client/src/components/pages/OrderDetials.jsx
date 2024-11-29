import React, { useContext, useEffect, useState } from "react";
import AXIOS from "axios";
import displayINRCurrency from "../../helpers/displayCurrency";
import Context from "../../context/context";
import { useLocation } from "react-router-dom";
import { FaCheck, FaUser, FaClipboardList, FaTruck } from "react-icons/fa";

export default function OrderDetail() {
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});
  const [currentStep, setCurrentStep] = useState(0); // Track the index of the current step
  const context = useContext(Context);
  const location = useLocation();

  // Define step names and icons
  const steps = [
    { name: "Order Placed", icon: FaCheck },
    { name: "Processing", icon: FaUser },
    { name: "Shipped", icon: FaClipboardList },
    { name: "Delivered", icon: FaTruck },
  ];

  useEffect(() => {
    setProduct(location?.state?.product);
    setOrder(location?.state?.order);

    // Determine the current step index based on order status
    const status = location?.state?.order?.order_status;
    const stepIndex = steps.findIndex((step) => step.name === status);
    setCurrentStep(stepIndex >= 0 ? stepIndex : 0);
  }, [location?.state]);

  return (
    <div className="container pt-24 p-12 bg-primary-light bg-opacity-50 flex items-center min-w-full justify-center min-h-[100vh]">
      <div className="md:w-full">
        <div className="mx-auto flex p-2 flex-col md:flex-row text-white max-w-4xl bg-accent-dark bg-opacity-80 rounded-lg shadow-2xl border-2 border-accent-dark">
          {/* Order and Product Details */}
          <div>
            <h1 className="text-xs md:text-sm p-3 capitalize">
              Order Id: {order?.order_id}
            </h1>
            <div className="flex">
              <div className="p-4 flex items-center">
                <div className="flex items-center justify-center w-[105px] h-[105px] md:w-40 md:h-40 mr-2">
                  <img
                    src={`https://zenglow-server.onrender.com/ProductImages/${product?.ProductId?.productImage[0]}`}
                    alt="Product"
                    className="w-full h-full object-scale-down"
                  />
                </div>
              </div>
              <div className="p-4 flex w-[250px] bg-green-200 border-l-[1px] flex-col gap-2">
                <h1 className="md:text-3xl text-xl h-auto flex  capitalize font-semibold">
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
                <p className="text-wrap flex-col md:w-[400px]">
                  <span className="capitalize text-sm md:text-base">{`${order?.address?.house}, ${order?.address?.street}, ${order?.address?.city}, ${order?.address?.district}, ${order?.address?.state}, ${order?.address?.country} - ${order?.address?.pincode}`}</span>
                  <p>{`Mob: ${order?.mobilenumber}`}</p>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-16 pl-10 md:pl-0  w-[395px] md:w-[425px]">
            {/* Horizontal Stepper */}
            <ol className="flex items-center mt-16 md:pl-10  w-full mb-8">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`flex w-full items-center ${
                    index < currentStep
                      ? "text-green-600 dark:text-green-500 after:border-pink-900"
                      : ""
                  } ${
                    index < steps.length - 1 // Only apply "after" styles if not the last step
                      ? "after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block dark:after:border-gray-700"
                      : ""
                  }`}
                >
                  <span
                    className={`flex items-center justify-center ${
                      index == steps.length - 1
                        ? "w-10 h-10 lg:h-12 lg:w-12"
                        : "w-20 h-10 lg:h-12 lg:w-24"
                    } rounded-full  ${
                      index <= currentStep
                        ? "bg-orange-100 border-2 border-pink-900 text-pink-900 0"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-100"
                    }`}
                  >
                    {React.createElement(step.icon, {
                      className: "text-lg lg:text-xl",
                    })}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
