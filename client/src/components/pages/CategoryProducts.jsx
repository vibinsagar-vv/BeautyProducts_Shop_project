import React from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";

export default function CategoryProducts() {
  const params = useParams();

  return (
    <div>
      <MyNavbar />
      <div className="pt-16">{params.categoryName}</div>
      <Footer/>
    </div>
  );
}
