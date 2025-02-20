import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      onLogin(response.data.role);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password.");
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Login</h2>
        {error && <p style={{ color: "yellow", fontWeight: "bold" }}>{error}</p>}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="username" style={{ textAlign: "left", fontWeight: "bold" }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              fontSize: "16px",
            }}
          />

          <label htmlFor="password" style={{ textAlign: "left", fontWeight: "bold" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

