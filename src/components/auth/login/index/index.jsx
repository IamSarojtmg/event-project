import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../../firebase/auth.js";
import { useAuth } from "../../../../contexts/index";
import logo from "../../../images/logo.png";
import Animation from "../animation/animation.jsx";
import "./index.css";
import Header from "../../../header/index.jsx";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage("");

      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Invalid email format. Please check and try again.");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("No account found with this email. Please register.");
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage("Incorrect password. Please try again.");
        } else {
          setErrorMessage("Error signing in. Please try again.");
        }
      }

      setIsSigningIn(false); // Reset signing in state
    }
  };

  return (
    <>
      <div className="container">
        <div className="mainCont">
          {userLoggedIn && <Navigate to={"/home"} replace={true} />}
          <main className="main">
            <img className="logo" src={logo} alt="" srcset="" />

            <h3 className="header">
              Elevating Events with Professional Touch!
            </h3>

            <form onSubmit={onSubmit} className="form">
              <div className="formGroup">
                <label className="label">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  placeholder="northcoders@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="input"
                />
              </div>

              <div className="formGroup">
                <label className="label">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="northcoders123"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="input"
                />
              </div>

              {errorMessage && <span className="error">{errorMessage}</span>}

              <button type="submit" disabled={isSigningIn} className="button">
                {isSigningIn ? "Loging In ..." : "Log In"}
              </button>
            </form>
            
            <div class="hr-container">
              <hr />
              <span>or</span>
            </div>

            <footer className="otherOptions">
              <Link to={"/guest"} className="link">
                Guest
              </Link>
              <Link to={"/register"} className="link">
                Sign Up
              </Link>
            </footer>
          </main>
          <Animation />
        </div>
      </div>
    </>
  );
};

export default Login;
