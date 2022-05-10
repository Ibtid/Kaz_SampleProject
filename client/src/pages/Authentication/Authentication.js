import React, { useState } from 'react';
import { register } from '../../API/user';
import './Authentication.css';

const Authentication = () => {
  const [hasAccount, setHasAccount] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resgisterClicked = () => {
    console.log(formData);

    register(formData).then((response) => {
      console.log(response);
    });
  };

  const loginClicked = () => {
    console.log(formData);
  };

  return (
    <div className='authentication'>
      <div className='authentication__container'>
        <div className='authentication__logo'>SampleMart</div>
        {!hasAccount && (
          <div className='authentication__inputContainer'>
            <div className='authentication__inputLabel'>Username</div>
            <input
              name='username'
              type='text'
              placeholder='Your name'
              className='authentication__input'
              value={formData.userName}
              onChange={onChangeFormData}
            />
          </div>
        )}
        <div className='authentication__inputContainer'>
          <div className='authentication__inputLabel'>Email</div>
          <input
            name='email'
            type='text'
            placeholder='@gmail.com'
            className='authentication__input'
            value={formData.email}
            onChange={onChangeFormData}
          />
        </div>
        <div className='authentication__inputContainer'>
          <div className='authentication__inputLabel'>Password</div>
          <input
            name='password'
            type='password'
            placeholder='Atleast 6 characters'
            className='authentication__input'
            value={formData.password}
            onChange={onChangeFormData}
          />
        </div>
        {hasAccount ? (
          <div className='authentication__button' onClick={loginClicked}>
            Login
          </div>
        ) : (
          <div className='authentication__button' onClick={resgisterClicked}>
            Register
          </div>
        )}
        {!hasAccount ? (
          <div className='authentication__smallText'>
            Already have an account?{' '}
            <span
              className='highlightedText'
              onClick={() => {
                setHasAccount(true);
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
                setHasAccount(false);
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
