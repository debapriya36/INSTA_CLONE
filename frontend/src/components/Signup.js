import React, { useState } from "react";
import "./Signup.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex=/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;



  const postData = () => {
// email validation
   if(!emailRegex.test(email)){
    notifyA("Please Enter Valid Email ID :(");
    return;
   }
   
   if(!passRegex.test(password))
   {
    const str="Password must contain,1 capital, 1 small letter and 1 numeric field and total 6 chars long :(";
  //  notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!");
    notifyA(str);
  return;
   }

    // sending frontend data to backend
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        userName,
        password,
      }), 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.msg);
          navigate("/signin");
        }
        console.log(data);
      });
  };

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="ig logo" />
          <p className="loginPara">
            Sign up to see photos and videos <br /> from your friends.
          </p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you agree to our <br /> Terms , Data Policy and
            Cookies Policy .
          </p>
          <input
            type="submit"
            id="submit-btn"
            value="Sign Up"
            onClick={() => postData()}
          />
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer",textDecoration:"underline",
            fontWeight:"bold",
            fontSize:"20px" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
