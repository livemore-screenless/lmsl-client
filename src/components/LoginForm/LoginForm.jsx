import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

//mui imports
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

const Input = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 200,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
  },
}));

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login} >
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <center>
        <div>
          <Typography component="div" variant="h6" color="#27466B" className='form-head form-head-main'> Welcome Back! </Typography>
          <br/>
        </div>
        <Input
          variant="filled"
          type="text"
          name="username"
          required
          value={username}
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </center>
        <br/>
      <center>
      <Input 
        variant="filled"
        type="password"
        name="password"
        required
        value={password}
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      </center>
        <br/>
      <center>
        <input className="btn btn_sizeFull" type="submit" name="submit" value="Sign In" />
      </center>
    </form>
  );
}

export default LoginForm;
