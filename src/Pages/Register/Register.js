import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { auth, googleProvider } from "../../Components/Firebase/Firebase";
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { IoLogoGoogleplus } from "react-icons/io";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { name, email, password, phone, address, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while registering");
    }
  };

  const handleGoogleSignIn = async () => {
    // const provider = new googleProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User Info:", user);
      toast.success("Signed in successfully with Google!");
      navigate("/home"); // Adjust the route as needed
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="main-container-register">
      <div>
        <div className="register-container">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <hr />
            <label>Username</label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter the Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter the Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Phone</label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter the Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label>Address</label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter the Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label>Answer</label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter your favorite color"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button className="Submit-btn">Submit</button>
            <p className="Already-para">Already Have an Account?</p>
            <div className="btn-register-container">
              <Link to="/login" className="login-btn-register">
                Login
              </Link>
              <button className="Sign-in-Google" onClick={handleGoogleSignIn}>
              Sign-in
                <IoLogoGoogleplus
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    marginBottom :"4px",
                    fontSize: "24px",
                  }}
                />
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
