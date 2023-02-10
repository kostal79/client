import React from "react";
import "./Navbar.less";
import Logo from "../../assets/navbar_logo.svg";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <img src={Logo} alt="" className="navbar__logo" />
          <div className="navbar__header">MERN CLOUD</div>
          <div className="navbar__login">Enter</div>
          <div className="navbar__registration">Registration</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
