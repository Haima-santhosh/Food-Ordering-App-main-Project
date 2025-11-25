import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { UserContext } from "./context/UserContext";
import { UserProvider } from "./context/UserProvider";

//-------------USER SIDE AUTH-------------------------
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

//-------------ADMIN SIDE AUTH-------------------------
import AdminSignInPage from "./pages/admin/AdminSignInPage";
import AdminSignUpPage from "./pages/admin/AdminSignUpPage";

//-------------USER SIDE PAGES-------------------------
import UserSideLayout from "./layout/UserSideLayout";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import AboutPage from "./pages/AboutPage";
import RestaurantPage from "./pages/RestaurantsPage";
import MenuPage from "./pages/MenuPage";
import SingleMenuDetailsPage from "./pages/SingleMenuDetailsPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import MyReviews from "./pages/MyReviews";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";

//-------------ADMIN SIDE PAGES-------------------------
import AdminLayout from "./layout/AdminSideLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import RestaurantManagement from "./pages/admin/RestaurantManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import MenuManagement from "./pages/admin/MenuManagement";
import CouponManagement from "./pages/admin/CouponManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import ReviewManagement from "./pages/admin/ReviewManagement";
import AdminProfile from "./pages/admin/AdminProfile";

//-------------PROTECTED ROUTES-------------------------
// Protect user-only routes
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  return user && user.role === "user" ? children : <Navigate to="/signin" />;
}

// Protect admin-only routes
function ProtectedAdminRoute({ children }) {
  const { user } = useContext(UserContext);
  return user && user.role === "admin" ? children : <Navigate to="/admin/signin" />;
}

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Admin Auth Routes */}
        <Route path="/admin/signin" element={<AdminSignInPage />} />
        <Route path="/admin/signup" element={<AdminSignUpPage />} />

        {/* User Side Pages */}
        <Route path="/" element={<UserSideLayout />}>
          {/* Home page */}
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Other public pages */}
          <Route path="about" element={<AboutPage />} />
          <Route path="restaurants" element={<RestaurantPage />} />
          <Route path="restaurants/:restId/menu" element={<MenuPage />} />
          <Route path="restaurants/:restId/menu/:itemId" element={<SingleMenuDetailsPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Protected User Routes */}
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-orders"
            element={
              <ProtectedRoute>
                <MyOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-reviews"
            element={
              <ProtectedRoute>
                <MyReviews />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Stripe Payment Result Pages */}
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancel" element={<PaymentCancelPage />} />

        {/* Admin Side Pages */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="restaurants" element={<RestaurantManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="menus" element={<MenuManagement />} />
          <Route path="coupons" element={<CouponManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
