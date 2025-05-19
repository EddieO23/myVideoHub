import { createBrowserRouter } from 'react-router-dom';


import SignUp from './pages/auth/SignUp.jsx';
import SignIn from './pages/auth/SignIn.jsx';
import UserProfile from './pages/user/UserProfile.jsx';
import {
  ProtectedRoute,
  ProtectedRouteHome,
} from './components/ProtectedRouter.jsx';
import ResetPasswordEmail from './pages/auth/ResetPasswordEmail.jsx';
import UpdatePassword from './pages/auth/UpdatePassword.jsx';

export const router = createBrowserRouter([
  { path: '/sign-up', element: <ProtectedRoute element={<SignUp />} /> },
  { path: '/sign-in', element: <ProtectedRoute element={<SignIn />} /> },
  {
    path: '/user/profile',
    element: <ProtectedRouteHome element={<UserProfile />} />,
  },
  {
    path: '/reset-password',
    element: <ProtectedRoute element={<ResetPasswordEmail />} />,
  },
  { path: '/reset-password/:token', element: <ProtectedRoute element={ <UpdatePassword /> }/>},
]);
