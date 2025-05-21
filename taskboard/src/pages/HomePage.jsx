// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

export default function HomePage() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm rounded-4 overflow-hidden">
        <div className="row g-0 align-items-center">
          
          
          <div className="col-md-6 p-5">
            <h1 className="display-4 fw-bold mb-3">
              Build your product with confidence
            </h1>
            <p className="lead text-muted mb-4">
              A brief description of your product or service goes here.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg homepageButtons">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
