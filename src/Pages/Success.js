import React from 'react';
import './PaymentSuccess.css'; // Custom CSS

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="checkmark-container">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
          </svg>
        </div>
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">
          Your payment has been successfully processed. Thank you for your purchase.
        </p>
        <button className="back-to-home-button" onClick={() => window.location.href = '/'}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
