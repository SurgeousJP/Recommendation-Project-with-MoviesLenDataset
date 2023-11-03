import { useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import HomeLayout from './layouts/HomeLayout';
import Details from './pages/Details';

export default function useRouteElement() {
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
      path: '/details',
      element: (
        <HomeLayout>
          <Details />
        </HomeLayout>
      )
    },
    {
      path: '/login',
      element: <Login />
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
