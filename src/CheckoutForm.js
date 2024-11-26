import React, { useState } from 'react';

function CheckoutForm() {
  const [isHovered, setIsHovered] = useState(false);

  const handlePayClick = () => {
    const paymentLinkUrl = 'https://buy.stripe.com/test_3cs4kidZY6VubjG6oo'; 
    window.location.href = paymentLinkUrl; 
  };

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <p>Click the button below to proceed with your payment:</p>
      <button 
        onClick={handlePayClick} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isHovered ? '#0056b3' : '#007bff', 
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease', 
        }}
      >
        Pay
      </button>
    </div>
  );
}

export default CheckoutForm;
