import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import logo from "../img/logo.png";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";


const Signin = () => {
  const {setUserLogin}=useContext(LoginContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email")
      return
    }
    // Sending data to server
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB("Signed In Successfully")
          console.log(data)
          setUserLogin(true)
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/")
        }
   //     console.log(data)
      })
  }
  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input type="email" name="email" id="email"  placeholder="Email" 
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
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
              onChange={(e)=>{
              setPassword(e.target.value)
            }}
            />
          </div>
          <input type="submit" id="login-btn" onClick={() => { postData() }} value="Sign In"/>
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer",
            textDecoration:"underline",
            fontWeight:"bold",
            fontSize:"20px"
             }}>
            
            Sign Up
            
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};



export default Signin;
