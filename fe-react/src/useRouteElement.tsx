import { useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import HomeLayout from './layouts/HomeLayout';
import Details from './pages/Details';
import SearchResult from './pages/SearchResult';

import UserProfile from './pages/User/UserProfile';
import Logout from './pages/Logout/Logout';
import DiscussionLayout from './layouts/DiscussionLayout/DiscussionLayout';
import DiscussionDetails from './pages/Discussion/DiscussionDetails';
import { path } from './constant/path';
import NotFound from './pages/NotFound/NotFound';
import DiscussionMovie from './pages/Discussion/DiscussionMovie';
import Leaderboard from './pages/Leaderboard/Leaderboard';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <HomeLayout />,
      children: [
        {
          path: path.default,
          element: <HomePage />
        },
        {
          path: path.leaderboard,
          element: <Leaderboard />
        },
        {
          path: path.search,
          element: <SearchResult />,
          children: [
            {
              path: ':type'
            }
          ]
        },
        {
          path: '/u/:id',
          element: <UserProfile />
        },
        {
          path: path.logout,
          element: <Logout />
        },
        {
          path: path.details,
          children: [
            {
              path: path.default,
              element: <NotFound />
            },
            {
              path: path.id,
              element: <Details />
            },
            {
              path: ':id',
              element: <Details />
            }
          ]
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },

    {
      path: path.login,
      element: <Login />
    },
    {
      path: path.register,
      element: <Register />
    },
    {
      path: path.forgot_password,
      element: <ForgotPass />
    },
    {
      element: <DiscussionLayout />,
      children: [
        {
          path: path.discussions,
          element: <DiscussionDetails />,
          children: [
            {
              path: path.discussion_id,
              element: <DiscussionDetails />
            }
          ]
        },
        {
          path: path.details,
          children: [
            {
              path: path.id,
              children: [
                {
                  path: path.discussions,
                  children: [
                    {
                      path: path.default,
                      element: <DiscussionMovie />
                    },
                    {
                      path: path.discussion_id,
                      element: <DiscussionDetails />
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]);
  return routeElement;
}
