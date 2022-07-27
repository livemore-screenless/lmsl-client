import React from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import LogOutButton from '../LogOutButton/LogOutButton';
import './SubNav.css';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';

function SubNav() {
  // imports
  const history = useHistory()
  const user = useSelector((store) => store.user);
  
  // function to push usr home when logo is clicked
  function home(){
    history.push(`/`);
  }

  return (
    <div className="sub-nav">
      <Link to="/home">
        <h2 className="sub-nav-title">Video Competition</h2>
      </Link>
      <br/><br/>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="sub-navLink" to="/login">
            Sign in / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {/* THESE LINKS WILL NEED TO BE UPDATED ONCE COMPONENTS ARE CREATED */}
        {user.id && user.id!=1 && (
          <>
            <Link className="sub-navLink" to="/my-videos">
              My Videos
            </Link>

            <Link className="sub-navLink" to="/prompt-page">
              View Videos
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* If THE ADMIN is logged in, show these links */}
        {/* THESE LINKS WILL NEED TO BE UPDATED ONCE COMPONENTS ARE CREATED */}
        {user.id && user.id===1 && (
          <>
            <Link className="sub-navLink" to="/review-submissions">
              Review Submissions
            </Link>

            <Link className="sub-navLink" to="/prompt-page">
              Review Prompts
            </Link>

            <LogOutButton className="sub-navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default SubNav;
