import React from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";

export default function SubCategoryProducts() {
  const params = useParams();

  return (
    <div>
      <div className="pt-16">{params.subcategoryName}</div>
      <Footer/>
    </div>
  );
}
