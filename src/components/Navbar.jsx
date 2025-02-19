import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css";

const Navbar = ({ isLoggedIn, role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo or App Name */}
        <div className="navbar-logo">
          <Link to="/">MovieApp</Link>
        </div>
        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/theaters">Theaters</Link>
          </li>
          {isLoggedIn && role === "customer" && (
            <li>
              <Link to="/my-bookings">My Bookings</Link>
            </li>
          )}
          {isLoggedIn && role === "admin" && (
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          )}
        </ul>
        {/* Authentication Links */}
        <div className="navbar-auth">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                Login
              </Link>
              <Link to="/register" className="auth-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

