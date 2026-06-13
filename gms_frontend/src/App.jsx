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
import ApplyAsTrainer from "./pages/ApplyAsTrainer.jsx";
import TrainerApplicationsPage from "./pages/admin/TrainerApplicationsPage.jsx";
import AdminUsersPage from "./pages/admin/adminUsersPage.jsx";
import AdminProductPage from "./pages/admin/adminProductPage.jsx";
// import AdminProductsPage from "./pages/admin/AdminProductsPage.jsx";
import AdminTrainers from "./pages/admin/adminTrainers.jsx";
import AdminSchedules from "./pages/admin/adminSchedules.jsx";
import DeleteForm from "./components/deleteForm.jsx";
import ProductByPage from "./pages/ProductByPage.jsx";
import TrainersPage from "./pages/trainersPage.jsx";
import CartPage from "./pages/cartPage.jsx";
import PaymentPage from "./pages/paymentPage.jsx";
import CheckoutPage from "./pages/checkoutPage.jsx";
import MemberDashboard from "./pages/MemberDashboard.jsx";
import SchedulesPage from "./pages/schedulesPage.jsx";
import AddTrainerPage from "./pages/admin/adminAddTrainersPage.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" />



        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/Applyastrainer" element={<ApplyAsTrainer />} />
          <Route path="/trainer/login" element={<SigninPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/delete" element={<DeleteForm />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/schedules" element={<SchedulesPage />} />
          <Route path="/product/:id" element={<ProductByPage />} />


          {/* Member Dashboard */}
          <Route path="/dashboard" element={<MemberDashboard />} />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<h1>Admin Dashboad</h1>} />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route
              path="trainer-applications"
              element={<TrainerApplicationsPage />}
            />
            <Route path="memberships" element={<h1>Memberships Page</h1>} />
            <Route path="trainers" element={<AdminTrainers />} />
            <Route path="add-trainers" element={<AddTrainerPage />} />
            <Route path="schedules" element={<AdminSchedules />} />
            <Route path="revenue" element={<h1>Revenue Page</h1>} />
            <Route path="settings" element={<h1>Settings Page</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;