import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const onViewVideos = (event) => {
    history.push('/prompt-page');
  };

  return (
    <div className="container">
        <div >
          <center>
            <h1><div>LiveMore ScreenLess</div> <div>Video Competition</div></h1>
            <div>competition details go here - will need copy from lmsl. Something like:</div>
            <div>This is a site dedicated to educating people about how to use technology in a healthy manner. You can upload videos answering prompts regaring this use and they will be judged for creativity etc. </div>

            <button onClick={onViewVideos}>
              See All
            </button>

            <h4>Login/Register here to upload videos of your own</h4>
            <button className="btn" onClick={onLogin}>
              Login/Register
            </button>
          </center>
        </div>
    </div>
  );
}

export default LandingPage;
