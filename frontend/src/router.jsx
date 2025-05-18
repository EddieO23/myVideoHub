import {createBrowserRouter} from 'react-router-dom';

import SignUp from './pages/auth/SignUp.jsx'
import SignIn from './pages/auth/SignIn.jsx';
import UserProfile from './pages/user/UserProfile.jsx';
import { ProtectedRoute, ProtectedRouteHome } from './components/ProtectedRouter.jsx';

export const router = createBrowserRouter([
  {path: '/sign-up', element: <ProtectedRoute element={<SignUp/>}/>},
  {path: '/sign-in', element: <ProtectedRoute element={<SignIn/>}/>},
  {path: '/user/profile', element: <ProtectedRouteHome element={<UserProfile/>}/>},
])