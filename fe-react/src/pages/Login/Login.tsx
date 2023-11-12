import { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import './Login.css';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';
import { Link } from 'react-router-dom';

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
        <button className='mb-4 mt-9'>Sign in</button>
        <span className='sign__delimiter'>or</span>
        <SocialSign></SocialSign>
        <span className='sign__text'>
          Don&apos;t have an account? <Link to='/register'>Sign up!</Link>
        </span>
        <span className='sign__text'>
          <Link to='/forgot'>Forgot password?</Link>
        </span>
      </form>
    </div>
  );
}
