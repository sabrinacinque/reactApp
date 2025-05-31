import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-2 mt-auto">

        <div className="row">
          <div className="col-12 text-center">
            <p className="small mb-1">
              © 2024 TaskBoard. All rights reserved.
            </p>
            <span className=" x-small">
              Made with ❤️ for better productivity <br></br> by Sabrina Cinque
            </span>
          </div>
        </div>
    
    </footer>
  );
}
