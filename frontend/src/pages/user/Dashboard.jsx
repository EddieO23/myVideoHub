import {useDispatch, useSelector} from 'react-redux'
import {selectLoggedInUser} from '../../reducers/auth/authReducer.js'
import { useEffect } from 'react'

const Dashboard = () => {
  const loggedInUser = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const token = localStorage.getItem('')
  }, [])


  return (
    <div>
      
    </div>
  )
}

export default Dashboard
