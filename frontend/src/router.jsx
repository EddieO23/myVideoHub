import {createBrowserRouter} from 'react-router-dom';

import SignUp from './pages/auth/SignUp.jsx'
import SignIn from './pages/auth/SignIn.jsx';
import UserProfile from './pages/user/UserProfile.jsx';

export const router = createBrowserRouter([
  {path: '/sign-up', element: <SignUp/>},
  {path: '/sign-in', element: <SignIn/>},
  {path: '/user/profile', element: <UserProfile/>},
])