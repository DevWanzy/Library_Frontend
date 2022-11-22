import {
  faChair,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-items">
      <div className="logo-container">
        <div className="logo">
          <FontAwesomeIcon icon={faGraduationCap} size="3x" />
        </div>
      </div>
      <div className="nav-links">
        <NavLink
          to="/home"
          activeClassName="nav-link-active"
          className="nav-link"
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Dashboard</span>
          <br />
        </NavLink>
        <NavLink
          activeClassName="nav-link-active"
          to="/Students"
          className="nav-link"
        >
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>Students</span>
        </NavLink>

        <NavLink
          activeClassName="nav-link-active"
          to="/staff"
          className="nav-link"
        >
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>Staff</span>
        </NavLink>
      </div>
      <div className="dev-info">
        <div className="dev-box" />
        <span className="dev-name">Isabella</span>
      </div>
    </div>
  );
}

export default Navbar;
