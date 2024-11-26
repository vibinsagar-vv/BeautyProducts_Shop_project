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
import ProductView from "../components/pages/ProductView";
import SubCategoryProducts from "../components/pages/SubCategoryProducts";
import MyNavbar from "../components/flowbiteHeader";
import WishList from "../components/pages/WishList";
import UpdateProfilePage from "../components/UpdateProfilePage";
import ProductBuyPage from "../components/pages/BuyProduct";
import Orders from "../components/pages/Orders";
import OrderDetial from "../components/pages/OrderDetials";
import ForgotPassOtpInput from "../components/ForgotPassVerification";
import NewPassword from "../components/NewPasswordPage";
import PrivateRoute from "../helpers/PrivateRoute";
import AfterAuthFun from "../helpers/AfterAuthFun";

export default function UserPage() {
  return (
    <div>
      <div>
        <MyNavbar />
      </div>
      <main className="min-w-full">
        <Routes>
          {/* public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswod />} />
          <Route
            path="/product-category/:categoryName"
            element={<CategoryProducts />}
          />
          <Route
            path="/product-subcategory/:subcategoryName"
            element={<SubCategoryProducts />}
          />
          <Route path="/product/:id" element={<ProductDetials />} />
          <Route path="/search" element={<SearchProducts />} />
          <Route path="/table" element={<SelectionTable />} />

          {/* private routes */}

          <Route path="/otp-verification" element={<AfterAuthFun><OtpInput /></AfterAuthFun>} />
          <Route
            path="/verify-ForgotPassword"
            element={<AfterAuthFun><ForgotPassOtpInput /></AfterAuthFun>}
          />
          <Route path="/ChangePassword" element={<AfterAuthFun><NewPassword /></AfterAuthFun>} />

          <Route path="/profile/*" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/updateProfile" element={<PrivateRoute><UpdateProfilePage /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/order_detial" element={<PrivateRoute><OrderDetial /></PrivateRoute>} />
          
          <Route path="/wishlist" element={<PrivateRoute><WishList /></PrivateRoute>} />
          <Route path="/buy" element={<PrivateRoute><ProductBuyPage /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}
