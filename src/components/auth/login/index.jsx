import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/index";
import AdminLogin from "./info";

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
    <div style={styles.container}>
    <AdminLogin/>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main style={styles.main}>
        <h3 style={styles.header}>Welcome</h3>
        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={styles.input}
              />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={styles.input}
              />
          </div>

          {errorMessage && <span style={styles.error}>{errorMessage}</span>}

          <button type="submit" disabled={isSigningIn} style={styles.button}>
            {isSigningIn ? "Signing In ..." : "Sign In"}
          </button>
        </form>

        <Link to={"/guest"} style={styles.link}>Guest</Link>
        <p style={styles.text}>
          Don't have an account? <Link to={"/register"} style={styles.link}>Sign Up</Link>
        </p>
      </main>
    </div>
              </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    flexDirection: "column",

  },
  main: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    width: "93%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    
  },
  link: {
    display: "block",
    textAlign: "center",
    marginTop: "10px",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    marginTop: "10px",
    color: "#333",
  },
};

export default Login;
