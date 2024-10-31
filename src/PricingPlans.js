import React from 'react';
import { useNavigate } from 'react-router-dom';

function PricingPlans() {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    if (plan === 'premium') {
      navigate('/payment');
    }
  };

  return (
    <div className="container">
      <h2>Pricing Plans</h2>
      <div>
        <h3>Free Plan</h3>
        <p>Basic access to DEV@Deakin features</p>
        <button onClick={() => handleSelectPlan('free')}>Select Free Plan</button>
      </div>
      <div>
        <h3>Premium Plan</h3>
        <p>Access to advanced features like customization and analytics</p>
        <button onClick={() => handleSelectPlan('premium')}>Select Premium Plan</button>
      </div>
    </div>
  );
}

export default PricingPlans;
