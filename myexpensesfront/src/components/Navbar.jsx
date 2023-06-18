import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import "./ExpenseForm.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar_logo">ET</h2>
      <ul className="navbar_links">
        <li className="navbar_link">
          <NavLink exact to="/" className="navbar__link">
            Home
          </NavLink>
        </li>
        <li className="navbar_link">
          <NavLink exact to="/dashboard" className="navbar__link">
            Dashboard
          </NavLink>
        </li>
        <li className="navbar_link">
          <NavLink exact to="/expenses" className="navbar__link">
            Expenses
          </NavLink>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
