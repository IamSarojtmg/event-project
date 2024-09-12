import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/index";

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
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main>
        <h3>Welcome back</h3>
        <form onSubmit={onsubmit}>
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
            <label>Password</label>
            <input 
            type="password"
            autoComplete="currrent-password"
            required
            value={password} onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          {errorMessage && (<span>{errorMessage}</span>)}
          <button
          type="submit"
          disabled={isSigningIn}

          >{isSigningIn ? 'Signing In ...':'Sign in'}</button>
        </form>
        <p>Dont have account<Link to={'/register'}>signup</Link></p>
      </main>
    </div>
  );
};

export default Login
