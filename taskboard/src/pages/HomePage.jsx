import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../MainComponent/Sidebar";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="page-layout d-flex">
      <Sidebar />

      <div className="hero-background flex-grow-1 d-flex align-items-center ps-5">
        <div className="container text-white">
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-3 text-white">
                Build your product with confidence
              </h1>
              <p className="lead text-white-50 mb-4">
                A brief description of your product or service goes here.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg me-2">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
