import React, { useState } from "react";
import profile_rhombuzz from "../assets/images/profile_rhombuzz.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="navbar-left">Welcome Rhombuzz </div>

        <div className="navbar-right" onClick={() => setOpen(!open)}>
          <img
            src={profile_rhombuzz}
            alt="profile_rhombuzz"
            className="nav-avatar"
          />
          <span className="nav-email">{user.email}</span>
          <span className="arrow">
            <IoMdArrowDropdown />
          </span>

          {open && (
            <div className="account-dropdown">
              <div className="dropdown-title">Switch Account</div>
              <div className="divider"></div>
              {/* Account Item */}
              <div className="account-item active">
                <div className="left">
                  <div className="account-icon red">A</div>
                  <div className="info">
                    <div className="name">Akash</div>
                    <div className="email">{user.email}</div>
                  </div>
                </div>
                <FaCheckCircle className="check" />
              </div>

              <div className="account-item">
                <div className="left">
                  <div className="account-icon purple">R</div>
                  <div className="info">
                    <div className="name">RHB</div>
                    <div className="email">careers@gmail.com</div>
                  </div>
                </div>
              </div>

              <div className="account-item add">
                <div className="left">
                  <div className="account-icon teal">+</div>
                  <div className="name">Add New Account</div>
                </div>
              </div>
              <div className="divider"></div>

              <div className="menu-item">Profile</div>

              <div className="menu-item">
                Settings <IoSettingsOutline className="icon" />
              </div>

              <div className="menu-item red" onClick={onLogout}>
                Sign Out <IoLogOutOutline className="icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
