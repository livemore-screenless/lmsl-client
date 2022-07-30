import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';
import { useSelector } from 'react-redux';

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
          <div className='landing-image'>
            <img src={require('./abstract.png')}/>
            <div className='landing-body'>
              <h1 className='landing-header'>DIGITAL WELLBEING</h1>
              <p className='main-landing-copy'>
                LiveMore ScreenLess recognizes and appreciates the vast benefits that technology brings to our lives. However, evidence is mounting that misuse and overuse of technology is harmful to the health and wellbeing of young people.
              </p>
              <Link to="/prompt-page" className='videos-btn'>
                Watch Videos
              </Link>
            </div>
            </div>
          <br/>
          <br/>
          {!user.id &&
            <>
              <b>
                Sign In or Register
              <br/>
                to contribute.
              </b>
            </>
          }
        </center>
      </div>
    </div>
  );
}

export default LandingPage;
