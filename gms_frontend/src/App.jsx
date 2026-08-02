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
import ApplyAsTrainer from "./pages/Applyastrainer.jsx";
import TrainerApplicationsPage from "./pages/admin/TrainerApplicationsPage.jsx";
import AdminUsersPage from "./pages/admin/adminUsersPage.jsx";
import AdminProductPage from "./pages/admin/adminProductPage.jsx";
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
import AdminMemberships from "./pages/admin/adminMembership.jsx";
import AdminRevenuePage from "./pages/admin/adminReveuePage.jsx";
import AdminSettingsPage from "./pages/admin/adminSettingPage.jsx";
import ProfilePage from "./pages/profilepage.jsx";
import SessionPage from "./pages/sessionPage.jsx";
import TrainerBookingsPage from "./pages/trainers/bookingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomeLandingPage from "./pages/HomeLandingPage.jsx";
import DietPlansPage from "./pages/dietPlansPage.jsx";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/home" element={<HomeLandingPage/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          
          <Route path="/product/:id" element={
            <ProtectedRoute allowedRoles={['MEMBER', 'ADMIN', 'TRAINER']}>
              <ProductByPage />
            </ProtectedRoute>
          } />
          
          <Route path="/dietplans" element={
            <ProtectedRoute>
              <DietPlansPage />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/personal-training" element={<h1>Personal Training</h1>}/>
          <Route path="/equipment" element={<h1>Modern Equipment</h1>}/>
          <Route
            path="/personal-training"
            element={<h1>Personal Training</h1>}
          />
          <Route path="/equipment" element={<h1>Modern Equipment</h1>} />

          <Route path="/sessions" element={
            <ProtectedRoute>
              <SessionPage />
            </ProtectedRoute>
          } />

          {/* Member Dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['MEMBER']}>
              <MemberDashboard />
            </ProtectedRoute>
          } />

          {/* Admin Dashboard */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route path="admindashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route
              path="trainer-applications"
              element={<TrainerApplicationsPage />}
            />
            <Route path="memberships" element={<AdminMemberships />} />
            <Route path="trainers" element={<AdminTrainers />} />
            <Route path="/admin/add-trainer" element={<AddTrainerPage />} />
            <Route path="schedules" element={<AdminSchedules />} />
            <Route path="revenue" element={<AdminRevenuePage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          <Route path="/booksessions" element={
            <ProtectedRoute allowedRoles={['TRAINER']}>
              <TrainerBookingsPage />
            </ProtectedRoute>
          } />

          {/* Fallback Catch-All Route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
