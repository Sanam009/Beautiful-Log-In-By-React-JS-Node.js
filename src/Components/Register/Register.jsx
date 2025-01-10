import React, { useState } from 'react';
import './Register.css';
import '../../App.css';
import video from '../../LoginAssets/o.mp4';
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import logo from '../../LoginAssets/188333.png';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const createUser = (event) => {
    console.log('Creating user with:', email, userName, password);  // Log data before sending

    Axios.post('http://localhost:3003/register', {
      Email: email,
      UserName: userName,
      Password: password,
    }).then((response) => {
      console.log('User has been created', response);
    }).catch((error) => {
      console.error('There was an error creating the user!', error);
    });
  };

  return (
    <div className='registerPage flex'>
      <div className='container flex'>
        <div className='videoDiv'>
          <video src={video} autoPlay muted loop></video>
          <div className='textDiv'>
            <h2 className='title'>Create and Sell Products</h2>
            <p>Adopt the peace of nature</p>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Already have an account?</span>
            <Link to={'/'}>
              <button className='btn'>LogIn</button>
            </Link>
          </div>
        </div>

        <div className='formDiv flex'>
          <div className='headerDiv'>
            <img src={logo} alt="Logo Image" />
            <h3>Let Us Know You</h3>
          </div>

          <form className='form grid' onSubmit={createUser}>
            <div className='inputDiv'>
              <label htmlFor="email">Email</label>
              <div className='input flex'>
                <MdMarkEmailRead className='icon' />
                <input
                  type="email"
                  id='email'
                  placeholder='Enter email'
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="username">Username</label>
              <div className='input flex'>
                <FaUserShield className='icon' />
                <input
                  type="text"
                  id='username'
                  placeholder='Enter username'
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="password">Password</label>
              <div className='input flex'>
                <BsFillShieldLockFill className='icon' />
                <input
                  type="password"
                  id='password'
                  placeholder='Enter password'
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <button type='submit' className='btn flex'>
              <span>Register</span>
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

export default Register;
