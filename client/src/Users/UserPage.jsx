import React from "react";
import AuthPage from "../components/AuthPage";
import ForgotPasswod from "../components/pages/ForgotPasswod";
import OtpInput from "../components/pages/OtpInput";
import CategoryProducts from "../components/pages/CategoryProducts";
import ProductDetials from "../components/pages/ProductDetials";
import ProfilePage from "../components/pages/Profile";
import Cart from "../components/pages/Cart";
import SearchProducts from "../components/pages/SearchProducts";
import SelectionTable from "../components/SimpleTable";
import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";

export default function UserPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswod />} />
        <Route path="/otp-verification" element={<OtpInput />} />
        <Route
          path="/product-category/:categoryName"
          element={<CategoryProducts />}
        />
        <Route path="/product/:id" element={<ProductDetials />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchProducts />} />
        <Route path="/table" element={<SelectionTable />} />
      </Routes>
    </div>
  );
}
