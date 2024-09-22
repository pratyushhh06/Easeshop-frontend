import React, { useState } from "react";


import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
 
  
    const navigate = useNavigate();
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", {
          email,
          newPassword,
          answer,
        });
  
        if (res.data.success) {
          toast.success(res.data.message);
         
         
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something Went wrong while changing password");
      }
    };
  return (
    <div className="main-login-container">
    <div className="login-container">
      <h1>Reset Password</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label className="login-email">Email</label>
        <input
          className="login-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login-password">New Password</label>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label className="login-password">Answer</label>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your fav Colour"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        
        <button className="login-submit">Reset</button>
      </form>
    </div>
    <div className="image-container-login">
      <img
        src="https://mosodigital.com/wp-content/uploads/2021/07/E-Commerce-Shopping-animated-graphic-green.gif"
        alt=""
      />
    </div>
  </div>
  )
}

export default ForgotPassword

