import React, { useState } from 'react';
import './Authentication.css';

const Authentication = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className='authentication'>
      <div className='authentication__container'>
        <div className='authentication__logo'>SampleMart</div>
        {!login && (
          <div className='authentication__inputContainer'>
            <div className='authentication__inputLabel'>Username</div>
            <input
              type='text'
              placeholder='Your name'
              className='authentication__input'
            />
          </div>
        )}
        <div className='authentication__inputContainer'>
          <div className='authentication__inputLabel'>Email</div>
          <input
            type='text'
            placeholder='@gmail.com'
            className='authentication__input'
          />
        </div>
        <div className='authentication__inputContainer'>
          <div className='authentication__inputLabel'>Password</div>
          <input
            type='password'
            placeholder='Atleast 6 characters'
            className='authentication__input'
          />
        </div>
        {login ? (
          <div className='authentication__button'>Login</div>
        ) : (
          <div className='authentication__button'>Register</div>
        )}
        {!login ? (
          <div className='authentication__smallText'>
            Already have an account?{' '}
            <span
              className='highlightedText'
              onClick={() => {
                setLogin(true);
              }}>
              Login
            </span>
          </div>
        ) : (
          <div className='authentication__smallText'>
            Don't have an account?{' '}
            <span
              className='highlightedText'
              onClick={() => {
                setLogin(false);
              }}>
              Register
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
