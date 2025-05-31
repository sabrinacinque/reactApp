import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import WelcomeModal from "../components/WelcomeModal";
import "./LoginPage.css";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
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
        localStorage.setItem("username", identifier);

        // Alert di benvenuto
        await Swal.fire({
          title: `Hello ${identifier}!`,
          text: "Login success.",
          icon: "success",
          confirmButtonText: "Go to dashboard",
          background: "#0f1c25",
          color: "#fff"
        });

        // Check if we should show the welcome modal
        const hideWelcomeModal = localStorage.getItem('hideWelcomeModal');
        if (!hideWelcomeModal) {
          setShowWelcomeModal(true);
        } else {
          // If modal is hidden, go directly to dashboard
          navigate("/dashboard");
        }
      } else {
        setError(body.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Errore di rete");
    }
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    navigate("/dashboard");
  };

  return (
    <div className="hero-background d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <div className="login-card p-4 p-md-5">
              <h2 className="text-white text-center mb-4 fs-3 fw-bold">Log in</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    style={{ backgroundColor: '#0f1c25 !important' }}
                  />
                </div>

                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3 pe-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ backgroundColor: '#0f1c25 !important' }}
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                    style={{ cursor: 'pointer', zIndex: 10 }}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                {error && <div className="alert alert-danger text-center py-2 mb-3 small">{error}</div>}

                <button type="submit" className="btn btn-primary w-100 btn-lg py-2 mb-3">
                  Log in
                </button>
              </form>

              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0 text-white small"
                  onClick={() => setShowForgotPasswordModal(true)}
                >
                  Forgot your password?
                </button>
              </div>

              <p className="text-center text-white mb-0">
                Don't have an account? <Link to="/register" className="text-primary text-decoration-none">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleWelcomeModalClose}
        username={identifier}
      />
    </div>
  );
}