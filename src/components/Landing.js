import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function Landing({ onStart }) {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">
          Your modern <br />
          <span className="highlight">analytics portal</span>
        </h1>

        <p className="landing-subtitle">
          A beautiful, secure dashboard with real-time metrics, built with React
          and Sign in with Custom Provider.
        </p>

        <div className="landing-buttons">
          <button className="btn started-btn" onClick={onStart}>
            Get Started <HiArrowNarrowRight className="arrow-btn" />
          </button>
        </div>
      </div>
    </div>
  );
}
