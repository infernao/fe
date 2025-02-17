import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    onLogout();
    navigate("/login");
  };

  return (
    <nav style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" style={{ textDecoration: "none", color: "black" }}>
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/theaters"
            style={{ textDecoration: "none", color: "black" }}
          >
            Theaters
          </Link>
        </li>
        {isLoggedIn && role === "customer" && (
          <li>
            <Link
              to="/my-bookings"
              style={{ textDecoration: "none", color: "black" }}
            >
              My Bookings
            </Link>
          </li>
        )}
        {isLoggedIn && role === "admin" && (
          <li>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "black" }}
            >
              Admin Dashboard
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
