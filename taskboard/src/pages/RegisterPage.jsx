// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../MainComponent/Sidebar";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [type, setType] = useState("STANDARD");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validazione password
    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, username, email, password, active: true }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        // alert di successo con SweetAlert2
        await Swal.fire({
          title: "Registration successful!",
          text: "You can now log in.",
          icon: "success",
          confirmButtonText: "OK",
          background: "#0f1c25",
          color: "#fff",
        });
        navigate("/login");
      } else {
        setError(body.message || "Registrazione fallita");
      }
    } catch {
      setError("Errore di rete");
    }
  };

  return (
    <div className="page-layout d-flex">
      <Sidebar />

      <div className="hero-background flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="register-card col-10 col-md-8 col-lg-4 p-5">
          <h2 className="card-title">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="STANDARD">Standard</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-text">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 fs-4 my-3">
              Sign up
            </button>
          </form>

          <p className="alt-text text-center text-white-50 fs-5">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
