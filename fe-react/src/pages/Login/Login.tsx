import { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import './Login.css';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';
import { Link } from 'react-router-dom';
import { useSignIn } from 'src/hooks/useLogin';
import Input from 'src/components/Input/Input';
import { toast } from 'react-toastify';
import { INCORRECT_CREDENTIALS, LOGIN_FAILED, LOGIN_SUCCESSFULLY } from 'src/constant/error';

export default function Login() {
  const [username, setUsername] = useState('4nh3k');
  const [password, setPassword] = useState('12345');
  const [usernameError, setUsernameError] = useState('');

  const testSignIn = useSignIn();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload

    //const data = await login(username, password);
    console.log(username, password);
    testSignIn(
      { Username: username, Password: password },
      {
        onSuccess: data => {
          toast.success(LOGIN_SUCCESSFULLY);
        },
        onError: error => {
          if (error.response.status === 401) {
            setUsernameError(INCORRECT_CREDENTIALS);
          }
          toast.error(LOGIN_FAILED);
        }
      }
    );
  };

  return (
    <div id='container'>
      <form id='login' className='form-container' onSubmit={handleSubmit}>
        <img src={logo} alt='Logo'></img>
        <Input
          id='usernameInput'
          type='text'
          placeholder='Username'
          autoComplete='username'
          value={username}
          required
          errorMessage={usernameError}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          id='passwordInput'
          type='password'
          placeholder='Password'
          autoComplete='current-password'
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button id='signInButton' type='submit' className='primary-btn h-11 mb-4'>
          Sign in
        </button>
        <span className='sign__delimiter'>or</span>
        <SocialSign></SocialSign>
        <span className='sign__text'>
          Don&apos;t have an account?{' '}
          <Link id='signUpLink' to='/register'>
            Sign up!
          </Link>
        </span>
        <span className='sign__text'>
          <Link id='forgotPasswordLink' to='/forgot-password'>
            Forgot password?
          </Link>
        </span>
      </form>
    </div>
  );
}
