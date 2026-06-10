import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

// Your pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

// Team pages
import HomePage from "./pages/homePage.jsx";
import SigninPage from "./pages/signinPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import ProductPage from "./pages/productPage.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import AdminAddProduct from "./pages/admin/adminAddProduct.jsx";
import AdminUsers from "./pages/admin/adminUsersPage.jsx";
import AdminOrdersPage from "./pages/admin/adminOrdersPage.jsx";
import ApplyAsTrainer from "./pages/applyAsTrainer.jsx";
import MemberDashboard from './pages/MemberDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* Your pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<MemberDashboard />} />
        {/* Team pages */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Applyastrainer" element={<ApplyAsTrainer />} />
        <Route path="/trainer/login" element={<SigninPage />} />
        <Route path="/products" element={<ProductPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;