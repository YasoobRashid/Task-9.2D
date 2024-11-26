import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; 

const stripePromise = loadStripe('pk_test_51QPIY9E4CVYb8a9a9qqDoUkro9CYNISh803dWm7E6NStX1cvQxkcsFSQxCu7LcE2JRRNO1vJ8Csk1uXKuLzRkf5M00adJWwffD');

function Pricing() {
  return (
    <div className="pricing">
      <h1>Choose Your Plan</h1>
      <div className="plans">
        <div className="plan">
          <h2>Free Plan</h2>
          <p>Basic access to the app features.</p>
        </div>
        <div className="plan">
          <h2>Premium Plan</h2>
          <p>Get access to customization features like themes, banners, analytics, etc.</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm /> 
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
