import { Navigate, useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import HomeLayout from './layouts/HomeLayout';
import Details from './pages/Details';
import SearchResult from './pages/SearchResult';

import UserProfile from './pages/User/UserProfile';
import Logout from './pages/Logout/Logout';
import DiscussionLayout from './layouts/DiscussionLayout/DiscussionLayout';
import DiscussionPage from './pages/Discussion/DiscussionPage';

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
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgot',
      element: <ForgotPass />
    },
    {
      path: '/u/:id',
      element: (
        <HomeLayout>
          <UserProfile />
        </HomeLayout>
      )
    },
    {
      path: '/logout',
      element: <Logout />
    },
    {
      path: '/discussions',
      element: (
        <DiscussionLayout>
          <div className='w-10 h-[50rem] bg-white'>TExt</div>
        </DiscussionLayout>
      )
    },
    {
      path: '/discussions/:id',
      element: (
        <DiscussionLayout>
          <DiscussionPage movieTitle='Test' />
        </DiscussionLayout>
      )
    }
  ]);
  return routeElement;
}
