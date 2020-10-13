import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn } from '@fortawesome/pro-light-svg-icons'
import { faSignOut } from '@fortawesome/pro-light-svg-icons'
import { useAuth } from '../../_context/auth'
import authService from '../../_services/auth.service'
import userService from '../../_services/user.service'

export const Navbar = ({ fixed }) => {
  const { authUser, setAuthUser } = useAuth()

  const logOut = () => {
    authService.logout().then(()=>{
      setAuthUser()
    })
  }

  const avatarText = authUser && authUser.avatar === "#ffffff" ? 'text-black' : 'text-white'

  return (
    <>
      <nav className="w-full flex border-b border-gray-200 flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="w-full relative flex items-center justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
            >
            <img className="mx-auto h-8 w-auto" src="https://res.cloudinary.com/dy3c6sc72/image/upload/v1602630825/my_whole_self/mhs_logo_qkwkts.svg" alt="Workflow" />
            </Link>
          </div>
          <div
            className="lg:flex flex-grow items-center flex"
            id="example-navbar-danger"
          >
            <ul className="flex items-center lg:flex-row list-none lg:ml-auto">
            {
                authUser ? (
                    <>
                        <li className="nav-item">
                            <Link
                            className="px-3 py-2 flex items-center font-bold leading-snug text-white hover:opacity-75"
                            to="/profile"
                            >
                              <span
                                  style={{ backgroundColor: authUser.avatar }} className="inline-flex items-center justify-center h-10 w-10 rounded-full shadow bg-gray-500">
                                  <span className={`font-medium leading-none ${avatarText}`}>
                                      {userService.getUserInitials(authUser.username)}
                                  </span>
                              </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button
                                className="px-3 py-2 flex items-center text-s font-bold leading-snug hover:opacity-75"
                                onClick={logOut}
                            >
                            <FontAwesomeIcon className="text-lg leading-lg opacity-75" icon={faSignOut} /><span className="ml-2">Logout</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <Link
                        className="px-3 py-2 flex items-center text-s font-bold font-bold leading-snug hover:opacity-75"
                        to="/login"
                        >
                        <FontAwesomeIcon className="text-lg leading-lg opacity-75" icon={faSignIn} /><span className="ml-2">Login</span>
                        </Link>
                    </li>
                )
            }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}