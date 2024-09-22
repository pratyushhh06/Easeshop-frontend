// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaTwitter,FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Thank you for visiting Shopease</h2>
        <p>© 2024 Pratyush Singh. All rights reserved.</p>
        <div className="social-links">
          <Link to="/facebook" className="social-link">Facebook <i><FaFacebook/></i></Link>
          <Link to="/twitter" className="social-link">Twitter<i>< FaTwitter/></i></Link>
          <Link to="/instagram" className="social-link">Instagram <i><FaInstagram/></i></Link>
          <Link to="/linkedin" className="social-link">LinkedIn <i><FaLinkedin /></i></Link>
        </div>
        <div className="footer-animation">
          <svg width="200" height="20" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M0 10 Q50 0 100 10 T200 10"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
