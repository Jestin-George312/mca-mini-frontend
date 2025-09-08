import React, { useState } from "react";

const GlassAuth = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleTab = (tab) => setActiveTab(tab);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

        * {
          box-sizing: border-box;
        }
        body,html,#root {
          height: 100%;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #0c0c2d;
          overflow: hidden;
        }
        .background {
          position: fixed;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #6713d2, #1d2671);
          overflow: hidden;
          z-index: -2;
        }
        /* Animated wave lines */
        .wave {
          position: absolute;
          width: 150%;
          height: 150%;
          border-radius: 45%;
          filter: blur(75px);
          opacity: 0.5;
          transform-origin: center;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-direction: alternate;
        }
        .wave1 {
          top: -50%;
          left: -30%;
          background: #a13dd4;
          animation-name: wave1move;
          animation-duration: 9s;
        }
        .wave2 {
          top: -50%;
          right: -30%;
          background: #5a50d0;
          animation-name: wave2move;
          animation-duration: 8s;
        }
        .wave3 {
          bottom: -40%;
          left: 5%;
          background: #2e3cbf;
          animation-name: wave3move;
          animation-duration: 7s;
        }

        @keyframes wave1move {
          0% { transform: scale(1) translate(0, 0) rotate(0deg);}
          100% { transform: scale(1.2) translate(20px, 20px) rotate(15deg);}
        }
        @keyframes wave2move {
          0% { transform: scale(1) translate(0, 0) rotate(0deg);}
          100% { transform: scale(1.1) translate(-20px, 15px) rotate(-10deg);}
        }
        @keyframes wave3move {
          0% { transform: scale(1) translate(0, 0) rotate(0deg);}
          100% { transform: scale(1.3) translate(15px, -15px) rotate(20deg);}
        }


        .container {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          color: white;
          text-align: center;
          -webkit-font-smoothing: antialiased;
        }

        h1 {
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          font-size: 2.5rem;
          text-shadow:
            0 0 5px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(109, 44, 185, 0.4);
        }
        p.subtitle {
          margin: 0 0 1.5rem 0;
          font-weight: 400;
          font-size: 1rem;
          opacity: 0.75;
        }

        /* Tab container */
        .tabs {
          display: flex;
          border-radius: 20px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(255 255 255 / 0.25);
          background: rgba(255 255 255 / 0.1);
          backdrop-filter: blur(15px);
          width: 320px;
          max-width: 90vw;
          user-select:none;
          box-shadow: 0 4px 30px rgba(255 255 255 / 0.15);
        }
        .tab {
          flex: 1;
          padding: 0.7rem 0;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          color: #eee;
          transition: all 0.3s ease;
          position: relative;
          z-index: 10;
          user-select:none;
        }
        .tab:not(.active):hover {
          background-color: rgba(255 255 255 / 0.1);
        }
        .tab.active {
          background: linear-gradient(90deg, #4ab6fc, #81d1fc);
          color: white;
          box-shadow: 0 0 15px #7dc5fcaa;
          border-radius: 15px;
          z-index: 20;
        }


        /* Glass form container */
        .glass-card {
          background: rgba(255 255 255 / 0.12);
          border-radius: 20px;
          padding: 2rem 2rem 2.5rem 2rem;
          width: 360px;
          max-width: 90vw;
          box-shadow:
            inset 0 0 50px rgba(255 255 255 / 0.15),
            0 7px 30px rgba(109, 44, 185, 0.4);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255 255 255 / 0.2);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          color: white;
          user-select:none;
          transition: all 0.4s ease;
        }

        .glass-card h2 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255 255 255 / 0.5);
          font-size: 1.7rem;
        }

        .glass-card p.desc {
          margin-top: 0;
          margin-bottom: 2rem;
          font-weight: 400;
          font-size: 0.9rem;
          color: rgba(255 255 255 / 0.7);
          user-select:none;
        }

        .form-group {
          margin-bottom: 1.1rem;
          text-align: left;
        }

        label {
          font-weight: 700;
          font-size: 0.85rem;
          user-select:none;
        }

        input {
          margin-top: 0.3rem;
          width: 100%;
          border-radius: 12px;
          padding: 11px 14px 11px 38px;
          border: 1px solid rgba(255 255 255 / 0.25);
          background: rgba(255 255 255 / 0.12);
          color: white;
          font-size: 0.95rem;
          outline: none;
          box-shadow: inset 0 0 12px rgba(255 255 255 / 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          user-select:text;
        }

        input::placeholder {
          color: rgba(255 255 255 / 0.6);
          font-weight: 400;
        }

        input:focus {
          border-color: #7db5ff;
          box-shadow: 0 0 8px #7db5ff88;
          background: rgba(255 255 255 / 0.15);
        }

        /* Icon inside inputs */
        .input-icon {
          position: absolute;
          margin-left: 11px;
          margin-top: 11px;
          pointer-events:none;
          fill: rgba(255 255 255 / 0.7);
          width: 18px;
          height: 18px;
          filter: drop-shadow(0 0 1px rgba(0 0 0 0.2));
          user-select:none;
        }
        /* Wrapper for input + icon */
        .input-wrapper {
          position: relative;
        }

        /* Password eye toggle */
        .btn-eye {
          position: absolute;
          height: 100%;
          top: 0;
          right: 10px;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          width: 25px;
          color: rgba(255 255 255 / 0.6);
          transition: 0.3s ease;
          user-select:none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .btn-eye:hover {
          color: rgba(255 255 255 / 0.9);
        }


        /* Action buttons */
        .btn {
          margin-top: 1.5rem;
          width: 100%;
          padding: 13px 0;
          font-weight: 700;
          font-size: 1rem;
          background: linear-gradient(90deg, #4ab6fc, #81d1fc);
          border: none;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          box-shadow: 0 8px 20px #5db5fdcc;
          transition: all 0.3s ease;
          user-select:none;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px #64a7ffdd;
        }

        /* Small text below button */
        .terms {
          font-size: 0.75rem;
          margin-top: 1rem;
          opacity: 0.7;
          line-height: 1.3;
          user-select:none;
        }
        .terms a {
          color: white;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .terms a:hover {
          text-decoration: underline;
        }

        /* Forgot password link */
        .forgot {
          margin-top: 1rem;
          font-size: 0.85rem;
          opacity: 0.8;
          user-select:none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .forgot:hover {
          text-decoration: underline;
          color: #a93cf1;
        }

        /* Responsive */
        @media (max-width: 400px) {
          .glass-card {
            padding: 1.5rem 1.5rem 2rem;
            width: 90vw;
          }
          .tabs {
            width: 90vw;
          }
        }
      `}</style>

      {/* Background waves */}
      <div className="background" aria-hidden="true">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <main className="container" aria-label="Glassmorphism authentication UI">
        <h1>Glass Auth</h1>
        <p className="subtitle">Beautiful glassmorphism authentication</p>

        {/* Tabs */}
        <nav aria-label="Authentication Tabs" className="tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "login"}
            aria-controls="login-panel"
            id="login-tab"
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => toggleTab("login")}
            tabIndex={activeTab === "login" ? 0 : -1}
            type="button"
          >
            Login
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "signup"}
            aria-controls="signup-panel"
            id="signup-tab"
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => toggleTab("signup")}
            tabIndex={activeTab === "signup" ? 0 : -1}
            type="button"
          >
            Sign Up
          </button>
        </nav>

        {/* SignUp Form */}
        {activeTab === "signup" && (
          <section
            id="signup-panel"
            aria-labelledby="signup-tab"
            role="tabpanel"
            tabIndex={0}
            className="glass-card"
          >
            <h2>Create Account</h2>
            <p className="desc">Join us today and start your journey</p>

            <form>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <div className="input-wrapper">
                  <svg
                    aria-hidden="true"
                    className="input-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    name="fullname"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <div className="input-wrapper">
                  <svg
                    aria-hidden="true"
                    className="input-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    id="signup-email"
                    placeholder="Enter your email"
                    name="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="input-wrapper">
                  <svg
                    aria-hidden="true"
                    className="input-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    placeholder="Create a password"
                    name="password"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="btn-eye"
                  >
                    {showPassword ? (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        height="18"
                        width="18"
                      >
                        <path d="M1 1l22 22" />
                        <path d="M17.94 17.94A10.08 10.08 0 0 1 12 19c-6.46 0-10-7-10-7a20.88 20.88 0 0 1 5.5-5.66" />
                        <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                        <path d="M12 7a5 5 0 0 1 5 5" />
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        height="18"
                        width="18"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <div className="input-wrapper">
                  <svg
                    aria-hidden="true"
                    className="input-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="signup-confirm-password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                    className="btn-eye"
                  >
                    {showConfirmPassword ? (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        height="18"
                        width="18"
                      >
                        <path d="M1 1l22 22" />
                        <path d="M17.94 17.94A10.08 10.08 0 0 1 12 19c-6.46 0-10-7-10-7a20.88 20.88 0 0 1 5.5-5.66" />
                        <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                        <path d="M12 7a5 5 0 0 1 5 5" />
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        height="18"
                        width="18"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn" aria-label="Create Account">
                Create Account
              </button>
            </form>

            <p className="terms">
              By signing up, you agree to our{" "}
              <a tabIndex={0} href="#terms" aria-label="Terms of Service">
                Terms of Service
              </a>{" "}
              and{" "}
              <a tabIndex={0} href="#privacy" aria-label="Privacy Policy">
                Privacy Policy
              </a>
            </p>
          </section>
        )}

        {/* Login Form */}
        {activeTab === "login" && (
          <section
            id="login-panel"
            aria-labelledby="login-tab"
            role="tabpanel"
            tabIndex={0}
            className="glass-card"
          >
            <h2>Welcome Back</h2>
            <p className="desc">Enter your credentials to access your account</p>

            <form>
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <div className="input-wrapper">
                  <svg
                    aria-hidden="true"
                    className="input-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    id="login-email"
                    placeholder="Enter your email"
                    name="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="input-wrapper">
                  <svg
                    aria-hidden="true"
                    className="input-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    placeholder="Enter your password"
                    name="password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="btn-eye"
                  >
                    {showPassword ? (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        height="18"
                        width="18"
                      >
                        <path d="M1 1l22 22" />
                        <path d="M17.94 17.94A10.08 10.08 0 0 1 12 19c-6.46 0-10-7-10-7a20.88 20.88 0 0 1 5.5-5.66" />
                        <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                        <path d="M12 7a5 5 0 0 1 5 5" />
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        height="18"
                        width="18"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn" style={{ background: "#8c57ff", boxShadow: "0 8px 23px #8d59ffcc" }} aria-label="Sign In">
                Sign In
              </button>
            </form>

            <p className="forgot" tabIndex={0} role="link" aria-label="Forgot your password?">
              Forgot your password?
            </p>
          </section>
        )}
      </main>
    </>
  );
};

export default GlassAuth;