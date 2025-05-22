// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Sidebar from "../MainComponent/Sidebar";
import "./LoginPage.css";

export default function LoginPage() {
  const [identifier, setIdentifier]       = useState("");
  const [password, setPassword]           = useState("");
  const [showPassword, setShowPassword]   = useState(false);
  const [error, setError]                 = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/v1/sessions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        // Salvo il token e l'userId
        localStorage.setItem("token", body.sessiondata.token);
        localStorage.setItem("userId", String(body.sessiondata.userid));

        // Alert di benvenuto
        await Swal.fire({
          title: `Hello ${identifier}!`,
          text: "Login effettuato con successo.",
          icon: "success",
          confirmButtonText: "Vai alla dashboard",
          background: "#0f1c25",
          color: "#fff"
        });

        // Redirect in dashboard
        navigate("/dashboard");
      } else {
        setError(body.message || "Login fallito");
      }
    } catch (err) {
      console.error(err);
      setError("Errore di rete");
    }
  };

  return (
    <div className="page-layout d-flex">
      <Sidebar />

      <div className="hero-background flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="login-card col-10 col-md-8 col-lg-4 p-5">
          <h2 className="login-title">Log in</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email or Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {error && <div className="error-text">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 fs-5 py-2">
              Log in
            </button>
          </form>

          <p className="signup-text">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
