import { Navigate, useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import HomeLayout from './layouts/HomeLayout';
import Details from './pages/Details';
import SearchResult from './pages/SearchResult';
import useToken from './hooks/useToken';
import { buildApiUrl } from './helpers/api';

export default function useRouteElement() {
  const { token, setToken } = useToken();

  const authenticateUser = async () => {
    const url = buildApiUrl('user/authenticateUser');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    });
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
  };

  if (token) {
    authenticateUser();
  }

  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <HomeLayout>
          <ProductList />
        </HomeLayout>
      )
    },
    {
      path: '/details/:id',
      element: (
        <HomeLayout>
          <Details />
        </HomeLayout>
      )
    },
    {
      path: '/search/:type',
      element: (
        <HomeLayout>
          <SearchResult />
        </HomeLayout>
      )
    },
    {
      path: '/search',
      element: (
        <HomeLayout>
          <SearchResult />
        </HomeLayout>
      )
    },
    {
      path: '/login',
      element: token ? <Navigate to='/' /> : <Login setToken={setToken} />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgot',
      element: <ForgotPass />
    }
  ]);
  return routeElement;
}
