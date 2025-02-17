import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import Theaters from './pages/Theaters';
import MovieDetail from './pages/MovieDetail';
import TheaterDetail from './pages/TheaterDetail';
import BookMovie from './pages/BookMovie';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './components/AdminBookings'; // Import AdminBookings
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading'; // Import the Loading component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust duration as needed
  }, []);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
  };

  if (loading) {
    return <Loading />; // Render the Loading component while loading
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/theaters/:id" element={<TheaterDetail />} />
        <Route path="/book-movie/:id" element={<ProtectedRoute element={BookMovie} role={role} requiredRole="customer" />} />
        <Route path="/my-bookings" element={<ProtectedRoute element={MyBookings} role={role} requiredRole="customer" />} />
        <Route path="/admin" element={<ProtectedRoute element={AdminDashboard} role={role} requiredRole="admin" />} />
        <Route path="/admin/bookings" element={<ProtectedRoute element={AdminBookings} role={role} requiredRole="admin" />} />
        {/* Redirect to home page if route doesn't match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
