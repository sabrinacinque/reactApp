// src/MainComponent/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mx-5">
      <div className="container-fluid mx-5">
        <Link className="navbar-brand" to="/">
          TaskBoard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item p-3 fw-bold">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item p-3 fw-bold">
              <Link className="nav-link" to="/">
                About
              </Link>
            </li>
            <li className="nav-item p-3 fw-bold">
              <Link className="nav-link" to="/">
                Services
              </Link>
            </li>
            <li className="nav-item nav-item p-3 fw-bold">
              <Link className="nav-link" to="/">
                Contact
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item p-3">
                <Link
                  to="/login"
                  className="btn btn-primary btn-lg homepageButtons"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
