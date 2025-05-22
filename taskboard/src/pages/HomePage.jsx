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
                Menage your tasks efficiently
              </h1>
              <p className="lead text-white-50 mb-4">
                TaskBoard is a powerful task management tool that helps you
                organize your projects and collaborate with your team. With
                features like task assignment, progress tracking, and team
                collaboration, you can streamline your workflow and boost
                productivity.
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
