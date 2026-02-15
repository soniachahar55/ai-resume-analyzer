import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">AI Resume Analyzer</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {!userEmail && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {userEmail && (
          <>
            <span className="user-email">{userEmail}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
