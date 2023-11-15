import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    console.log(tokenString);
    return tokenString;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    console.log(userToken);
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token
  };
}
