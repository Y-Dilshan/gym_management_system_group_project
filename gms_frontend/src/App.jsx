
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/homePage.jsx';
import SigninPage from './pages/signinPage.jsx';
import SignUpPage from './pages/signUpPage.jsx';
import ProductPage from './pages/productPage.jsx';
import AdminDashboard from './pages/adminDashboard.jsx';
import AdminAddProduct from './pages/admin/adminAddProduct.jsx';
import AdminUsers from './pages/admin/adminUsersPage.jsx';
import AdminOrdersPage from './pages/admin/adminOrdersPage.jsx';
import ApplyAsTrainer from './pages/applyAsTrainer.jsx';


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
            <Route path="/products" element={<ProductPage />} />
            

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
