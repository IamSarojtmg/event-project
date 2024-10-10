import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts";

const Register = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main id="regis-cont">
        <h1>Create new account</h1>

        <form onSubmit={onSubmit} className="register-form">
          <div>
            <label>email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label>password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Confirm password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="off"
              required
              value={confirmPassword}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            />
          </div>

          {errorMessage && <span>{errorMessage}</span>}

          <button className="signup-btn"
            type="submit"
            disabled={isRegistering}
            // add classname with a condition
          >
            {isRegistering ? "Signing Up..." : "Sign up"}
          </button>
          <p className="already-acc">
            Already have an account?
            <Link className="continue" to={"/login"}>continue</Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Register;
