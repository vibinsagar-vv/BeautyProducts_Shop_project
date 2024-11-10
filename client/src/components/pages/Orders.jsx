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
        "http://localhost:7800/user/view-orders",
        { headers: header }
      );
      if (resData.data.success) {
        SetData(resData.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("555", data);

  useEffect(() => {
    fetchData();
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
    <div>
      <div className="container sm:text-2xl md:text-4xl mx-auto pt-16 p-4">
        <div className="text-center text-xl my-3">
          {data.length === 0 ? (
            <p className="bg-white py-5">No Data</p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
              <div className="w-full  ">
                {data.map((item, index) => {
                  return item.products.map((product) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full justify-between h-32 my-2 border bg-white border-black relative"
                      >
                        <div className="flex bg-red-200 items-center justify-center min-w-32 h-32 p-2">
                          <img
                            src={`http://localhost:7800/ProductImages/${product?.ProductId.productImage[0]}`}
                            alt=""
                            className="w-full h-full object-scale-down mix-blend-multiply"
                          />
                        </div>
                        <div className="px-4 bg-green-100  py-2 text-start">
                          <h2 className="text-lg font-medium text-start lg:text-xl text-ellipsis line-clamp-1">
                            {product?.ProductId.ProductName}
                          </h2>
                        </div>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
