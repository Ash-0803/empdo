import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-border">
          Todo
        </Link>
        <Link to="/employee">Employee</Link>
      </div>
    </nav>
  );
};

export default Navbar;
