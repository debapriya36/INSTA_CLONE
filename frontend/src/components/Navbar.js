import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "./Navbar.css";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ login }) => {
  const navigate = useNavigate();

  const { setModalOpen } = useContext(LoginContext);

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (token || login) {
      return [
        <>
          <Link to="/profile">
            <li
              style={{
                backgroundColor: "white",
                color: "#000",
                border: "1px solid #07f56a",
                  margin: "15px",
                 fontWeight:"bold",
                 fontSize:"20px"
              }}
            >
              Profile
            </li>
          </Link>
          <Link to="/createpost">
            <li
              style={{
                backgroundColor: "#white",
                color: "#000",
                border: "1px solid #07f56a",
                margin: "15px",
                fontWeight:"bold",
                 fontSize:"20px"
              }}
            >
              Create Post
            </li>
          </Link>
          <Link to="">
            <button
              className="primaryBtn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Logout
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #4CAF50",
              }}
            >
              SignUp
            </li>
          </Link>
          <Link to="/signin"
            style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #4CAF50",
                margin : "10px"
              }}>
            <li key={4}>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar sticky">
      <img
      id="ig-logo"
        src={logo}
        alt="logo"
        onClick={() => {
          navigate("/");
        }}
      />

      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
};

export default Navbar;
