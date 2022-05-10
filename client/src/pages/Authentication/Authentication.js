import React, { useState } from 'react';
import { register, login } from '../../API/user';
import './Authentication.css';

const Authentication = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [errors, setErrors] = useState();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resgisterClicked = () => {
    register(formData).then((response) => {
      console.log(response);
      if (response.errors) {
        setErrors(response.errors);
      }
    });
  };

  const loginClicked = () => {
    login(formData).then((response) => {
      console.log(response);
      if (response.errors) {
        setErrors(response.errors);
      }
    });
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
              className={
                errors?.username
                  ? 'authentication__input red-border'
                  : 'authentication__input'
              }
              value={formData.username}
              onChange={onChangeFormData}
            />
            {errors?.username && (
              <div className='authentication__inputError'>
                {errors.username}
              </div>
            )}
          </div>
        )}
        <div className='authentication__inputContainer'>
          <div className='authentication__inputLabel'>Email</div>
          <input
            name='email'
            type='text'
            placeholder='@gmail.com'
            className={
              errors?.email
                ? 'authentication__input red-border'
                : 'authentication__input'
            }
            value={formData.email}
            onChange={onChangeFormData}
          />
          {errors?.email && (
            <div className='authentication__inputError'>{errors.email}</div>
          )}
        </div>
        <div className='authentication__inputContainer'>
          <div className='authentication__inputLabel'>Password</div>
          <input
            name='password'
            type='password'
            placeholder='Atleast 6 characters'
            className={
              errors?.password
                ? 'authentication__input red-border'
                : 'authentication__input'
            }
            value={formData.password}
            onChange={onChangeFormData}
          />
          {errors?.password && (
            <div className='authentication__inputError'>{errors.password}</div>
          )}
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
                setErrors([]);
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
                setErrors([]);
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
