import React, { useContext, useEffect, useState } from "react";
import AXIOS from "axios";
import displayINRCurrency from "../../helpers/displayCurrency";
import { IoMdClose } from "react-icons/io";
import Context from "../../context/context";
import MyNavbar from "../flowbiteHeader";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [data, SetData] = useState([]);
  const context = useContext(Context);
  const nav = useNavigate();
  const handleOrderdetial = (product, order) => {
    nav("/order_detial", { state: { product: product, order: order } });
  };
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

  const fetchData = async () => {
    try {
      const header = {
        token: localStorage.getItem("token") || "",
      };
      const resData = await AXIOS.get(
        "https://zenglow-server.onrender.com/user/view-orders",
        { headers: header }
      );
      if (resData.data.success) {
        SetData(resData.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("47", data);

  useEffect(() => {
    fetchData();
  }, []);

  // const handleDeleteCartPrduct = async (id) => {
  //   const resData = await AXIOS.post(
  //     "https://zenglow-server.onrender.com/user/delete-cart-product",
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
  //     "https://zenglow-server.onrender.com/user/update-cart",
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
  //       "https://zenglow-server.onrender.com/user/update-cart",
  //       { Quantity: qty - 1, Id: id },
  //       { headers: { token: localStorage.getItem("token") || "" } }
  //     );
  //     if (resData.data.success) {
  //       fetchData();
  //     }
  //   }
  // };

  return (
    <div className="min-w-full">
      <div className="container sm:text-2xl md:text-4xl mx-auto pt-10 ">
        <div className="text-center text-xl">
          {data.length === 0 ? (
            <p className="bg-white py-5">Empty Orders</p>
          ) : (
            <div className="px-6">
              <h1 className="orderheading text-start md:text-5xl text-[38px]  mb-12 text-accent-dark">
                Order History
              </h1>
              <div className="flex justify-center gap-10">
                <div className="w-full max-w-5xl ">
                  {data.map((item, index) => {
                    return item.products.map((product) => {
                      return (
                        <div
                          onClick={() => {
                            handleOrderdetial(product, item);
                          }}
                          key={index}
                          className="flex w-full justify-between items-center h-32 text-white my-2 mb-6 border bg-opacity-85 bg-accent-dark rounded-xl border-black "
                        >
                          <div className="flex items-center justify-center min-w-24 h-24 md:min-w-32 md:h-32 p-2">
                            <img
                              src={`https://zenglow-server.onrender.com/ProductImages/${product?.ProductId.productImage[0]}`}
                              alt=""
                              className="w-full h-full object-scale-down"
                            />
                          </div>
                          <div className="md:px-2 flex text-white items-center py-2 text-start">
                            <h2 className="md:text-lg text-sm font-medium text-center pl-1 w-24 md:w-32 lg:text-xl truncate">
                              {product?.ProductId.ProductName}
                            </h2>
                          </div>
                          <div className="md:px-2 hidden md:flex items-center py-2 text-start">
                            <h4>{product?.Quantity}</h4>
                          </div>
                          <div className="md:px-2 hidden md:flex items-center py-2 text-start">
                            <h4>
                              {displayINRCurrency(
                                product?.Quantity *
                                  product?.ProductId?.sellingPrice
                              )}
                            </h4>
                          </div>
                          <div className="flex md:p-6 p-2 items-center">
                            <div className="">
                              <h2 className="md:text-lg pb-3 text-sm flex items-center justify-start font-semibold ">
                                {item.order_status}
                              </h2>
                              <h2 className="md:text-lg text-xs flex items-center font-medium ">
                                {new Date(item.updatedAt).toLocaleDateString(
                                  "en-GB"
                                )}
                              </h2>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
