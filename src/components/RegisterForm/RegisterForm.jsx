import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';

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
  const [agree, setAgree] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();


  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
  }

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


  // onSubmit={registerUser}
  return (
    <form className="formPanel"  >
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <center>
        <div className='form-head'>
          <Typography component="div" variant="h6" color="#27466B" className='form-head-main'>Sign Up!</Typography>
        </div>
        <br />
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
      <br />
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
      <br />
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
      <br />
      <center>

        <div>Please Read Terms</div>
        <Popup trigger={<button>Terms of Use</button>} modal>
          <div className='popup'><p>I give permission for use of submitted video content by LiveMore ScreenLess, and for possible inclusion in the LiveMore
            ScreenLess Youth Video Contest. These photos/videos may be published on LiveMore ScreenLess websites, the Youth Video Contest Gallery, and
            various online platforms including social media sites, such as Instagram and YouTube. Video submissions will primarily be used for the Youth
            Video Contest web application, a platform for young people to intentionally share about their experiences with digital media technology.
            <br />
            <br />
            I grant LiveMore ScreenLess the right to promote, edit, use, and reuse said products including use in print, on the internet, and all other
             forms of media.
            <br />
            <br />
            I also release LiveMore ScreenLess and its agents and employees from all claims, demands, and liabilities whatsoever in connection with the above.
          </p><input type="checkbox" onChange={checkboxHandler} />Agree</div>
        </Popup>

        <button disabled={!agree} className="btn btn_sizeFull" type='submit'
          onClick={registerUser}>
          Create Account</button>

      </center>
    </form>
  );
}

export default RegisterForm;
