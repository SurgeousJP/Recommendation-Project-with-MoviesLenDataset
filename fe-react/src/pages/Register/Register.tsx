import React, { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';
import '../Login/Login.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (selected: boolean) => {
    setIsChecked(selected);
  };

  return (
    <div id='container'>
      <form id='register' className='form-container'>
        <img src={logo} alt='Logo'></img>
        <input type='text' placeholder='Username'></input>
        <input type='text' className='mt-4' placeholder='Email'></input>
        <input type='password' className='mt-4' placeholder='Password'></input>
        <div className='checkbox-container mt-2'>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
            <span className='sign__text'>
              I agree to the <Link to='/privacy'>Privacy Policy</Link>
            </span>
          </Checkbox>
        </div>
        <button className='primary-btn h-11 mb-4 mt-9'>Sign up</button>
        <span className='sign__delimiter'>or</span>
        <SocialSign></SocialSign>
        <span className='sign__text'>
          Already have an account? <Link to='/login'>Sign in!</Link>
        </span>
      </form>
    </div>
  );
}
