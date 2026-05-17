import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/homePage.jsx';
import SigninPage from './pages/signinPage.jsx';
import SignUpPage from './pages/signUpPage.jsx';
import ProductPage from './pages/productPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/products" element={<ProductPage />} />
          </Routes>
        </div>

      </BrowserRouter>
    </>
  )
}

export default App;


