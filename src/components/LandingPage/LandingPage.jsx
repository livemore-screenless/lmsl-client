import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';
import { useSelector } from 'react-redux';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();
  const user = useSelector(store => store.user);

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
          <h1 className='landing-header'>DIGITAL WELLBEING</h1>
          <p className='landing-copy'>
            LiveMore ScreenLess recognizes and appreciates the vast benefits that technology brings to our lives. However, evidence is mounting that misuse and overuse of technology is harmful to the health and wellbeing of young people.
          </p>
          <p className='landing-copy'>

          </p>
          <Link to="/prompt-page" className='videos-btn'>
            Watch Videos
          </Link>
          <br/>
          <br/>
          {!user.id &&
            <>
              <b>
                Register or Sign In
              <br/>
                to contribute
              </b>
            </>
          }

            {/* <button className="btn" onClick={onLogin}>
              Sign In
            </button>
            <button className="btn" onClick={onRegister}>
              Register
            </button> */}
        </center>
      </div>
    </div>
  );
}

export default LandingPage;
