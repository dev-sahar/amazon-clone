import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

import './login.styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => history.push('/'))
      .catch((error) =>
        alert('Please enter a valid email address and password!')
      );
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        auth && history.push('/');
      })
      .catch((error) =>
        alert('Please enter a valid email address and password!')
      );
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='Logo'
        />
      </Link>

      <div className='login__container'>
        <h1>Sign In</h1>

        <form>
          <h5>Email</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required='required'
          />

          <h5>Password</h5>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required='required'
          />

          <button
            className='login__signInButton'
            type='submit'
            onClick={signIn}
          >
            Sign In
          </button>
        </form>

        <p className='login__statement'>
          By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <div className='login__registerContainer'>
          <p>Don't have an account?</p>

          <button className='login__registerButton' onClick={register}>
            Create your Amazon Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
