// This route is for logged in users only
import {Navigate} from 'react-router-dom'

export const ProtectedRouteHome = ({element}) => {
  const token = localStorage.getItem('token')
  return token ? element  : <Navigate to={'/sign-in'}></Navigate>
}


// This route is for the user if they are logged in then show profile

export const ProtectedRoute = ({element}) => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to={'/user/profile'}></Navigate> : element
}