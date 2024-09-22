import React, { useState, useEffect } from "react";
import UserMenu from "../../Components/UserMenu";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const {email ,name,phone , address} =auth.user;
    setName(name);
    setEmail(email);

    setPhone(phone);
    setAddress(address);
  },[auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = auth?.token;
      const {data} = await axios.put(
        "http://localhost:5000/api/v1/auth/profile",
        { name, email, password, phone, address },
        {
          headers: {
            Authorization: `${token}`, // Add token to the headers
          },
        }
      );
      if(data?.error){
        toast.error(data?.error);
      } else{
        setAuth({...auth,user:data?.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth" , JSON.stringify(ls));
        toast.success("profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong while updating user profile");
    }
  };
  return (
    <div>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register-container">
              <form onSubmit={handleSubmit}>
                <h1>User Profile</h1>
                
                <label>Username</label>
                <input
                  className="register-input"
                  type="text"
                  placeholder="Enter the Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              
                />

                <label>Email</label>
                <input
                  className="register-input"
                  type="text"
                  placeholder="Enter the Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                   disabled
                />

                <label>Password</label>
                <input
                  className="register-input"
                  type="text"
                  placeholder="Enter the Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 
                />

                <label>Phone</label>
                <input
                  className="register-input"
                  type="text"
                  placeholder="Enter the Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                
                />

                <label>Address</label>
                <input
                  className="register-input"
                  type="text"
                  placeholder="Enter the Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                 
                />

                <button className="Submit-btn">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
