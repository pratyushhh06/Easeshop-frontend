import React, { useState } from "react";
import "./Login.css";

import {useNavigate , useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../Context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[auth , setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user : res.data.user,
          token : res.data.token,
        })
        localStorage.setItem('auth' , JSON.stringify(res.data))
        localStorage.setItem("token",res?.data?.token);
        navigate(location.state ||"/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong while login");
    }
  };

  return (
    <div className="main-login-container">
      <div className="second-main-container-login">
      <div className="login-container">
        <h1>Login</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <label className="login-email">Email</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="login-password">Password</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button className="login-submit">Submit</button>
          <button className="login-submit" onClick={()=> {navigate('/forgot-password')}}>Forgot Password</button>
        </form>
      </div>
      <div className="image-container-login">
        <img
          src="https://mosodigital.com/wp-content/uploads/2021/07/E-Commerce-Shopping-animated-graphic-green.gif"
          alt=""
        />
      </div>
      </div>
    </div>
  );
};

export default Login;
