import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import userService from '../_services/user.service'
import { useAuth } from '../_context/auth'

const ProfilePageWidget = () => {

  const { authUser, } = useAuth()
  const avatarText = authUser.avatar === "#ffffff" ? 'text-black' : 'text-white'
  
  return (
    <Fragment>
    <nav className="flex items-center text-sm leading-5 font-medium">
        <Link to="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
        Home
        </Link>
        <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
        </svg>
        <Link to={`/profile`}  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
        My Profile
        </Link>
    </nav>  
    <div>
      <div className="bg-white my-12 pb-6 w-full flex flex-col overflow-hidden md:max-w-sm rounded-lg shadow-md mx-auto">
       <div className="flex flex-col items-center justify-center mx-auto mt-6 w-32">
        <span style={{ backgroundColor: authUser.avatar }} className="inline-flex items-center justify-center h-24 w-24 rounded-full shadow bg-gray-500">
          <span className={`font-medium leading-none ${avatarText} text-4xl`}>
              {userService.getUserInitials(authUser.username)}
          </span>
        </span>
       </div>
        <div className="mx-auto mt-6">
            <div className="flex justify-center items-center">
              <h1 className="text-lg font-semibold">
                {authUser.username} 
              </h1>
            </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default ProfilePageWidget
