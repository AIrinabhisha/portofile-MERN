import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './compounts/Home/Index'; // Fixed path from 'compounts'
import Loader from './Loader/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from './compounts/Home/Admin/Admin';
import Login from './pages/Login';
import PrivateRoute from './compounts/Home/Admin/PrivateRoute';
// import { useDispatch } from 'react-redux'; // ❌ Commented out since dispatch is not used

function App() {
  const [showLoading, setShowLoading] = useState(true);
  // const dispatch = useDispatch(); // ❌ Removed unused variable

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getPortfolioData = async () => {
    try {
      const response = await axios.get("/api/portfolio/intro");
      console.log("Portfolio Intro Data:", response.data);
    } catch (err) {
      console.error("Error fetching portfolio data:", err.message);
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  return (
    <div className="bg-primary min-h-screen">
      <BrowserRouter>
        {showLoading && <Loader />}

        {!showLoading && (
          <Routes>
            <Route path="/pr" element={<Index />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } />
            <Route path="/admin-login" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
