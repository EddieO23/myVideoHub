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
import Upload from './pages/user/Upload.jsx';
import AllVideos from './pages/AllVideos.jsx';
import Home from './pages/Home.jsx';
import SingleVideoPage from './pages/SingleVideoPage.jsx';
import MyVideos from './pages/user/MyVideos.jsx';
import UpdateVideo from './pages/user/UpdateVideo.jsx';

export const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/video/:id', element: <SingleVideoPage/>},
  { path: '/sign-up', element: <ProtectedRoute element={<SignUp />} />},
  { path: '/sign-in', element: <ProtectedRoute element={<SignIn />} /> },
  {
    path: '/user/profile',
    element: <ProtectedRouteHome element={<UserProfile />} />,
  },
  {
    path: '/user/edit/my-videos',
    element: <ProtectedRouteHome element={<MyVideos/>} />,
  },
  {
    path: '/user/edit/my-video',
    element: <ProtectedRouteHome element={<UpdateVideo/>} />,
  },
  {
    path: '/user/upload-video',
    element: <ProtectedRouteHome element={<Upload />} />,
  },
  {
    path: '/all-videos',
    element: <AllVideos/>
  },
  {
    path: '/reset-password',
    element: <ProtectedRoute element={<ResetPasswordEmail />} />,
  },
  { path: '/reset-password/:token', element: <ProtectedRoute element={ <UpdatePassword /> }/>},
]);
