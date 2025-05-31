import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

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
    <div className="hero-background d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-xxl-4">
            <div className="bg-dark bg-opacity-75 rounded-3 p-4 p-md-5 shadow">
              <h2 className="text-white text-center mb-4 fs-3 fw-bold">Sign up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select
                    className="form-select form-select-lg bg-dark text-white border-0 rounded-3"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    style={{ backgroundColor: '#0f1c25 !important' }}
                  >
                    <option value="STANDARD">Standard</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ backgroundColor: '#0f1c25 !important' }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ backgroundColor: '#0f1c25 !important' }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ backgroundColor: '#0f1c25 !important' }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ backgroundColor: '#0f1c25 !important' }}
                  />
                </div>

                {error && <div className="alert alert-danger text-center py-2 mb-3 small">{error}</div>}

                <button type="submit" className="btn btn-primary w-100 btn-lg py-2 mb-3">
                  Sign up
                </button>
              </form>

              <p className="text-center text-white mb-0">
                Already have an account? <Link to="/login" className="text-primary text-decoration-none">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}