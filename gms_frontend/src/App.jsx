import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/homePage.jsx";
import SigninPage from "./pages/signinPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import ProductsPage from "./pages/productsPage.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import AdminAddProduct from "./pages/admin/adminAddProduct.jsx";
import AdminOrdersPage from "./pages/admin/adminOrdersPage.jsx";
import ApplyAsTrainer from "./pages/applyAsTrainer.jsx";
import TrainerApplicationsPage from "./pages/admin/TrainerApplicationsPage.jsx";
import AdminUsersPage from "./pages/admin/adminUsersPage.jsx";
import AdminProductPage from "./pages/admin/adminProductPage.jsx"
import AdminTrainers from "./pages/admin/adminTrainers.jsx";
import AdminSchedules from "./pages/admin/adminSchedules.jsx";
import AdminMemberships from "./pages/admin/adminMembership.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/Applyastrainer" element={<ApplyAsTrainer />} />
            <Route path="/trainer/login" element={<SigninPage />} />
            <Route path="/products" element={<ProductsPage />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/trainer-applications" element={<TrainerApplicationsPage />} />
            <Route path="/admin/trainers" element={<AdminTrainers />} />
            <Route path="/admin/schedules" element={<AdminSchedules />} />
            <Route path="/admin/memberships" element={<AdminMemberships />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
