import { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import './Login.css';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';
import { Link } from 'react-router-dom';
import { buildApiUrl } from 'src/helpers/api';
import { useQuery } from 'react-query';

export default function Login({ setToken }) {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleCheckboxChange = (selected: boolean) => {
    setIsChecked(selected);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload
    setErrors([]); // clear any previous errors

    // validate form inputs
    const inputErrors: string[] = [];
    if (!username) {
      inputErrors.push('Username is required');
    }
    if (!password) {
      inputErrors.push('Password is required');
    }
    if (inputErrors.length > 0) {
      setErrors(inputErrors);
      return;
    }

    const url = buildApiUrl('user/login');
    console.log(username, password);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();
    console.log(data); // do something with the response data
    if (data.token) {
      console.log(data.token);
      setToken(data.token);
    }
    if (data.message) {
      setErrors([data.message]);
    }
    alert(JSON.stringify(data));
  };

  return (
    <div id='container'>
      <form id='login' className='form-container' onSubmit={handleSubmit}>
        <img src={logo} alt='Logo'></img>
        <input
          type='text'
          placeholder='Username'
          autoComplete='username'
          className={`${errors && 'border-red-500 border'}`}
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
        ></input>
        {errors && <span className='text-xs text-left text-red-500 mt-1 ml-1'>{errors}</span>}
        <input
          className='mt-4'
          type='password'
          placeholder='Password'
          autoComplete='current-password'
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        ></input>
        <div className='checkbox-container mt-4'>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
            Remember me
          </Checkbox>
        </div>
        <button type='submit' className='mb-4 mt-9'>
          Sign in
        </button>
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
