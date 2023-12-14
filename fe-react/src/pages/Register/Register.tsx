import React, { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';
import '../Login/Login.css';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createUserProfile } from 'src/helpers/api';
import { User } from 'src/helpers/type';
import { buildUserImageUrl } from 'src/helpers/utils';

export default function Register() {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleCheckboxChange = (selected: boolean) => {
    setIsChecked(selected);
  };

  const { mutate: register } = useMutation(createUserProfile, {
    onSuccess: () => {
      window.location.href = '/login';
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repeatPassword) return;
    const userProfile: User = {
      id: 1,
      username: username,
      password_hash: password,
      favorite_list: [],
      recommendation_list: [],
      watch_list: [],
      picture_profile: buildUserImageUrl(username, '13b6dc', 'fff')
    };
    register(userProfile);
  };

  return (
    <div id='container'>
      <form id='register' onSubmit={handleSubmit} className='form-container'>
        <img src={logo} alt='Logo'></img>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          className='mt-4'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type='password'
          className='mt-4'
          placeholder='Repeat Password'
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />
        <div className='checkbox-container mt-2'>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
            <span className='sign__text'>
              I agree to the <Link to='/privacy'>Privacy Policy</Link>
            </span>
          </Checkbox>
        </div>
        <button type='submit' className='primary-btn h-11 mb-4 mt-9'>
          Sign up
        </button>
        <span className='sign__delimiter'>or</span>
        <SocialSign></SocialSign>
        <span className='sign__text'>
          Already have an account? <Link to='/login'>Sign in!</Link>
        </span>
      </form>
    </div>
  );
}
