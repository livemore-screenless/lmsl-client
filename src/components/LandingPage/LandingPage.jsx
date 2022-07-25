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
    <div className="container landing-container">
      <div >
        <center>
          <h1 className='landing-header'>[logo maybe]</h1>
          <h1 className='landing-header'>DIGITAL WELLBEING COMPETITION</h1>
          <p className='landing-copy'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link to="/prompt-page">
            See All Videos
          </Link>
          <br/>
          <br/>
          <button className="btn" onClick={onLogin}>
            Sign In
          </button>

          <button className="btn" onClick={onRegister}>
            Register
          </button>
          <h4>Register or Sign in to submit videos of your own</h4>

        </center>
      </div>
    </div>
  );
}

export default LandingPage;
