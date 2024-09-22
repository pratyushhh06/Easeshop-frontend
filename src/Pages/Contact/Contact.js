import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="big-contact-container">
      
      <div className='contact-container'>
        <div className='left-contact-container'>
          <img
            src='https://cdn2.vectorstock.com/i/1000x1000/16/01/graphic-cartoon-character-contact-us-vector-34981601.jpg'
            alt='contact-pic'
          />
        </div>
        <div className='right-contact-container'>
          <h1 className='contact-heading'>Contact us</h1>

          <form className='input-box'>
           
            <input className="email-input-contact" type='text' placeholder='Email' />

            
            <input className="name-input-contact" type='text' placeholder='Name' />

            <input type='text' placeholder='Message' className="message-input-box" />

            <button type='submit' className='Send-message-btn'>
              Send Message
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
