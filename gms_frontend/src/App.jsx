import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/homePage.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div>
          <Routes>
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </div>

      </BrowserRouter>
    </>
  )
}

export default App;
