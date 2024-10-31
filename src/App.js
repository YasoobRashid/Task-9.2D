import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { auth, signOut } from './firebase';
import SignUp from './SignUp';
import Login from './Login';
import PricingPlans from './PricingPlans';
import Payment from './Payment';
import Post from './Post';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Signed out'))
      .catch((error) => console.error('Sign-out error:', error));
  };

  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/post">Create Post</Link>
          {user && <button onClick={handleSignOut}>Sign Out</button>}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <div>
                  <h2>Welcome, {user.email}</h2>
                </div>
              ) : (
                <>
                  <SignUp />
                  <Login />
                </>
              )
            }
          />
          <Route path="/plans" element={<PricingPlans />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
