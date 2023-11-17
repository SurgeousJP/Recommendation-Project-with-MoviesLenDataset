import { Navigate, useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import HomeLayout from './layouts/HomeLayout';
import Details from './pages/Details';
import SearchResult from './pages/SearchResult';
import { useUser } from './hooks/useUser';

export default function useRouteElement() {
  const { user } = useUser();
  if (user) {
    console.log('user', user);
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
      element: user ? <Navigate to='/' /> : <Login />
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
