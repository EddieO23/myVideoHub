import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import Layout from "../../components/Layout";
import backendApi from "../../api/backendApi";

const UpdatePassword = () => {
  const {token} = useParams()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate =  useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await backendApi.post(`/api/v1/auth/update-password/${token}`, {password})
      if(data.success) {
        toast.success(data.message)
        navigate('/sign-in')
      } else {
        toast.warning(data.message)
        navigate('/sign-up')
      }
    } catch (error) {
      toast.error('Something went wrong...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Reset Your Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Update Password Button with Loader */}
            <button
              type="submit"
              className={`w-full py-3 px-4 bg-green-500 text-white font-bold rounded-md shadow-md transition duration-300
              disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center ${
                loading ? "bg-opacity-90" : "hover:bg-opacity-90"
              }`}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Not a member yet?</span>{" "}
              <Link
                to="/sign-up"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up for free
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default UpdatePassword
