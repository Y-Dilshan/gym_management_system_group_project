import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/homePage.jsx';
import SigninPage from './pages/signinPage.jsx';
import SignUpPage from './pages/signUpPage.jsx';
import ProductPage from './pages/productPage.jsx';
import AdminDashboard from './pages/admin/adminDashboard.jsx';
import ManageMembers from './pages/admin/manageMebers.jsx';
import ManageTrainers from './pages/admin/manageTrainers.jsx';
import ManageBookings from "./pages/admin/manageBooking.jsx";
import ManageProducts from './pages/admin/manageProducts.jsx';
import ReportsAnalytics from './pages/admin/reportAnalytics.jsx';

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
            <Route path="/products" element={<ProductPage />} />
            

             <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/members" element={<ManageMembers />} />
            <Route path="/admin/trainers" element={<ManageTrainers />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/reports" element={<ReportsAnalytics />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  )
}

export default App;


