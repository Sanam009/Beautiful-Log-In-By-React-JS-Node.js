import React, { useEffect, useState } from 'react';
import './Login.css';
import '../../App.css';
import Axios from 'axios';
import video from '../../LoginAssets/o.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import logo from '../../LoginAssets/188333.png';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  const navigateTo = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3003/login', {
      LoginUserName: loginUserName,
      Password: loginPassword,
    })
    .then((response) => {
      if (response.data.message === 'Login successful!') {
        setLoginStatus(response.data.message);
        navigateTo('/dashboard');
      } else {
        setLoginStatus(response.data.message);
        setStatusHolder('showMessage');
      }
      // Reset form fields
      setLoginUserName('');
      setLoginPassword('');
    })
    .catch((error) => {
      console.error('There was an error logging in:', error);
    });
  };

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
        setLoginStatus(''); // Reset the login status after the message disappears
      }, 4000);
    }
  }, [loginStatus]);

  return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className='videoDiv'>
          <video src={video} autoPlay muted loop></video>
          <div className='textDiv'>
            <h2 className='title'>Create and Sell Products</h2>
            <p>Adopt the peace of nature</p>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Don't have an account?</span>
            <Link to={'/register'}>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>

        <div className='formDiv flex'>
          <div className='headerDiv'>
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>

          <form className='form grid' onSubmit={loginUser}>
            <span className={statusHolder}>{loginStatus}</span> {/* Display login status */}

            <div className='inputDiv'>
              <label htmlFor="username">Username</label>
              <div className='input flex'>
                <FaUserShield className='icon' />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  autoComplete="off" // Prevent autofill
                  value={loginUserName}
                  onChange={(event) => setLoginUserName(event.target.value)}
                />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="password">Password</label>
              <div className='input flex'>
                <BsFillShieldLockFill className='icon' />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  autoComplete="new-password" // Prevent autofill
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon' />
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
