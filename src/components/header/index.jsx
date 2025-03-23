import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/index";
import { doSignOut } from "../../firebase/auth";


const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <nav style={styles.navContainer}>
      {userLoggedIn ? (
        <>
          <button
            style={styles.button}
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {/* <Link style={styles.link} to={"/login"}>
            Login
          </Link>
          <Link style={styles.link} to={"/register"}>
            Register
          </Link> */}
        </>
      )}
    </nav>
  );
};

const styles = {
  navContainer: {
    padding: "10px",
    display: "flex",
    justifyContent: "center",  
    gap: "15px",
    backgroundColor: "#f4f4f4",
    borderBottom: "2px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    padding: "8px 12px",
    border: "1px solid #007bff",
    borderRadius: "4px",
  },
};

export default Header;
