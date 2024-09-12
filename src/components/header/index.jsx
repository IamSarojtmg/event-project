import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/index";
import { doSignOut } from "../../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav>
      {userLoggedIn ? (
        <>
          {" "}
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link to={"/login"}>login</Link>
          <Link to={"/register"}>register new account</Link>
        </>
      )}
    </nav>
  );
};

export default Header
