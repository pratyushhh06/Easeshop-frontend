import React from 'react';
import './PaymentFailed.css'; // Custom CSS

const PaymentFailed = () => {
  return (
    <div className="payment-failed-container">
      <div className="payment-failed-card">
        <div className="crossmark-container">
          <svg
            className="crossmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle className="crossmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="crossmark-check" fill="none" d="M16 16 36 36 M36 16 16 36" />
          </svg>
        </div>
        <h1 className="failed-title">Payment Failed</h1>
        <p className="failed-message">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <button className="retry-payment-button" onClick={() => window.location.href = '/payment'}>
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
