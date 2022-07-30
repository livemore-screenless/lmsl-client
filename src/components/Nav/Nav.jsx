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
    paddingLeft: '5%',
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
        {/* These are dummy links for the time being */}
          <> 
            <Link className="navLink" to="/">
              OUR TEAM
            </Link>

            <Link className="navLink" to="/">
              OUR APPROACH
            </Link>

            <Link className="navLink" to="/">
              LEARN MORE
            </Link>

            <Link className="navLink" to="/">
              GET INVOLVED
            </Link>
            
          </>
      </div>
    </div>
  );
}

export default Nav;
