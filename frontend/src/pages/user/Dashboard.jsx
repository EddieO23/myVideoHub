import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'


import {fetchUserDetails, selectLoggedInUser} from '../../reducers/auth/authReducer.js'
import SideBar from '../../components/SideBar.jsx'
import { FaEnvelope, FaUser, FaUserTag } from 'react-icons/fa'


const Dashboard = () => {
  const loggedInUser = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchUserDetails())
    }
  }, [])


  return (
    <div className="flex  gap-2 pr-2 h-full m-2">
      <SideBar />
      <main className="flex-1 p-4 mt-7 bg-white shadow-lg rounded-lg ml-0 lg:ml-64">
        <h1 className="text-center font-semibold text-xl text-gray-700 mb-5">
          Dashboard
        </h1>
        <div className="container flex flex-col gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <FaUser className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Name</h3>
                  <p className="text-gray-700 uppercase">
                    {loggedInUser?.name}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FaEnvelope className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-gray-700 ">{loggedInUser?.email}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <FaUserTag className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Role</h3>
                  <p className="text-gray-700">user</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 justify-around items-center">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md w-full lg:w-1/2">
              <h2 className="text-lg font-semibold text-blue-600 mb-2">
                Uploaded Videos
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                {loggedInUser?.uploadCount}
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md w-full lg:w-1/2 mt-4 md:mt-0">
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                Downloaded Videos
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                {loggedInUser?.downloadCount}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
