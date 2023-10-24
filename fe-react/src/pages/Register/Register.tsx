import React, { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';
import '../Login/Login.css';

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
        <input type='text' placeholder='Email'></input>
        <input type='password' placeholder='Password'></input>
        <div className='checkbox-container'>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
            <span className='sign__text'>
              I agree to the <a href='privacy'>Privacy Policy</a>
            </span>
          </Checkbox>
        </div>
        <button className='mb-4 mt-9'>Sign up</button>
        <span className='sign__delimiter'>or</span>
        <SocialSign></SocialSign>
        <span className='sign__text'>
          Already have an account? <a href='login'>Sign in!</a>
        </span>
      </form>
    </div>
  );
}
