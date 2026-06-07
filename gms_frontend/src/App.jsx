import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage.jsx";
import SigninPage from "./pages/signinPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import ProductsPage from "./pages/productsPage.jsx";

import AdminDashboard from "./pages/adminDashboard.jsx";
import AdminOrdersPage from "./pages/admin/adminOrdersPage.jsx";
import AdminProductPage from "./pages/admin/AdminProductsPage.jsx";
import AdminUsersPage from "./pages/admin/adminUsersPage.jsx";
import AdminTrainers from "./pages/admin/adminTrainers.jsx";
import AdminSchedules from "./pages/admin/adminSchedules.jsx";
import AdminMemberships from "./pages/admin/adminMembership.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/applyastrainer" element={<ApplyAsTrainer />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminOrdersPage />} />
          <Route path="dashboard" element={<h1>Dashboard Overview</h1>} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="memberships" element={<AdminMemberships />} />
          <Route path="trainers" element={<AdminTrainers />} />
          <Route path="schedules" element={<AdminSchedules />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;