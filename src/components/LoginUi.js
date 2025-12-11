import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
// signin custom provided
const VALID_EMAIL = "akash@rhombuzz.in";
const VALID_PASSWORD = "akashrhombuzz@369";

export default function Login({ onLogin }) {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //validation
  const validate = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    setError("");
    return true;
  };
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // check credentials
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // success
      setError("");
      onLogin(email);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="page-wrap">
      <div className="card login-card">
        <h2 className="title">Login to your Account</h2>
        <p className="subtitle">see what is going on with your business</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field-label">Email</label>
          <div className="input-row">
            <span className="icon">
              <MdOutlineMailOutline />
            </span>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label className="field-label">Password</label>
          <div className="input-row">
            <span className="icon">
              <RiLockPasswordLine />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="toggle password"
            >
              {showPassword ? (
                <RxEyeOpen className="icon" />
              ) : (
                <PiEyeClosedDuotone className="icon" />
              )}
            </button>
          </div>

          <div className="row-between small-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember Me
            </label>
            <a
              className="forgot-link"
              href="#forgot"
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </a>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn-style primary-btn-style">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
