import React from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//this is the mui styling 
const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 103.59,
  },
}));

function Nav() {
  // imports
  const history = useHistory()
  const user = useSelector((store) => store.user);
  const classes = useStyles();
  
  // function to push usr home when logo is clicked
  function home(){
    history.push(`/`);
  }

  return (
    <div className="nav">
      <img src={require('./trademark-03.png')} onClick={home} className={classes.logo}/>
      <br/><br/>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {/* THESE LINKS WILL NEED TO BE UPDATED ONCE COMPONENTS ARE CREATED */}
        {user.id && user.id!=1 && (
          <>
            <Link className="navLink" to="/my-videos">
              MY VIDEOS
            </Link>

            <Link className="navLink" to="/prompt-page">
              CONTRIBUTE A VIDEO
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* If THE ADMIN is logged in, show these links */}
        {/* THESE LINKS WILL NEED TO BE UPDATED ONCE COMPONENTS ARE CREATED */}
        {user.id && user.id===1 && (
          <>
            <Link className="navLink" to="/review-submissions">
              REVIEW SUBMISSIONS
            </Link>

            <Link className="navLink" to="/prompt-page">
              REVIEW PROMPTS
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
