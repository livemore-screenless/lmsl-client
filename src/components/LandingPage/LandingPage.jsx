import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const onRegister = (event) => {
    history.push('/registration');
  };


  return (
    <div className="container">
      <div >
        <center>
          <h1>[logo maybe]</h1>
          <h1>Video Competition</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link to="/prompt-page">
            See All
          </Link>

          <h4>Login/Register here to upload videos of your own</h4>
          <button className="btn" onClick={onLogin}>
            Sign In
          </button>

          <button className="btn" onClick={onRegister}>
            Register
          </button>
        </center>
      </div>
    </div>
  );
}

export default LandingPage;
