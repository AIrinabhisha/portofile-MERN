import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './compounts/Home/Index'; // Fixed path from 'compounts'
import Loader from './Loader/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ Make sure axios is imported
import { useDispatch } from 'react-redux';
import Admin from './compounts/Home/Admin/Admin';
import Login from './pages/Login';
import PrivateRoute from './compounts/Home/Admin/PrivateRoute';

function App() {
  const [showLoading, setShowLoading] = useState(true);
 const dispatch = useDispatch();
  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getPortfolioData = async () => {
    try {
      const response = await axios.get("/api/portfolio/intro")
      ; // ✅ Adjust this endpoint as needed
      console.log("Portfolio Intro Data:", response.data);
    } catch (err) {
      console.error("Error fetching portfolio data:", err.message);
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []); // ✅ Add dependency array to run only once on mount

  return (
    <div className="bg-primary min-h-screen">
      <BrowserRouter>
        {showLoading && <Loader />}

        {!showLoading && (
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={  <PrivateRoute>
            <Admin />
          </PrivateRoute>} />
            <Route path="/admin-login" element={<Login/>} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
