import { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import './Login.css';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';

export default function Login() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (selected: boolean) => {
    setIsChecked(selected);
  };

  return (
    <div id='container'>
      <form id='login' className='form-container'>
        <img src={logo} alt='Logo'></img>
        <input type='text' placeholder='Email'></input>
        <input type='password' placeholder='Password'></input>
        <div className='checkbox-container'>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
            Remember me
          </Checkbox>
        </div>
        <button className='sign__btn'>Sign in</button>
        <span className='sign__delimiter'>or</span>
        <SocialSign></SocialSign>
        <span className='sign__text'>
          Don&apos;t have an account? <a href='register'>Sign up!</a>
        </span>
        <span className='sign__text'>
          <a href='forgot'>Forgot password?</a>
        </span>
      </form>
    </div>
  );
}
