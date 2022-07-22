import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//mui imports
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
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

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        email: email,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser} >
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <center>
        <div className='form-head'>
          <Typography component="div" variant="h6" color="white" className='form-head-main'>Create an Account</Typography>
        </div>
          <Input 
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
            }}          
            variant="filled"
            type="text"
            name="username"
            value={username}
            required
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
      </center>
      <br/>
      <center>
        <Input
          inputProps={{
            autoComplete: 'new-password',
            form: {
              autoComplete: 'off',
            },
          }}          
          variant="filled"
          type="text"
          name="email"
          value={email}
          required
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </center>
        <br/>
      <center>
          <Input
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
            }}          
            variant="filled"
            type="password"
            name="password"
            value={password}
            required
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
      </center>
      <br/>
      <center>
        <input className="btn btn_sizeFull" type="submit" name="submit" value="Create Account" />
      </center>
    </form>
  );
}

export default RegisterForm;
