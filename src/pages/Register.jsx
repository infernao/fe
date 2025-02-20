import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password, role });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
      console.error(
        "Registration failed:",
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
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Register</h2>
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

          <label htmlFor="role" style={{ textAlign: "left", fontWeight: "bold" }}>
            Role:
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              fontSize: "16px",
            }}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #28a745, #218838)",
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

