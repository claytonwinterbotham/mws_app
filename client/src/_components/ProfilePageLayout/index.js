import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ProfilePageLayout = ({children}) => {

  

  const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false)
  const mobilePostBackgroundStyle = false ? 'transition-opacity ease-linear duration-300 opacity-100' : 'transition-opacity ease-linear duration-300 opacity-0'  

  const toggleMobileProfileMenu = () => {
    setShowMobileProfileMenu(state => !state)
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* start mobile nav */}
      {showMobileProfileMenu &&
      <div className="md:hidden">
          <div className="fixed inset-0 flex z-40">
       
            <div className={`fixed inset-0 ${mobilePostBackgroundStyle}`}>
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
         
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <div className="absolute top-0 right-0 p-1">
                <button onClick={toggleMobileProfileMenu} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-teal-200" aria-label="Close sidebar">
                  <svg className="h-6 w-6 text-black" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4">
                <p>My Whole Self</p>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-4 space-y-1">
                  <span className="flex-center rounded-lg shadow-sm">
                    <Link to="/profile" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                      My Profile
                    </Link>
                  </span>
                  <span className="flex-center rounded-lg shadow-sm">
                    <Link to="/editprofile" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                      Edit Profile
                    </Link>
                  </span>
                  <span className="flex-center rounded-lg shadow-sm">
                    <Link to="/mypost" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                      My Posts
                    </Link>
                  </span>
                  <span className="flex-center rounded-lg shadow-sm">
                    <Link to="/favpost" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                      My Favourite Posts
                    </Link>
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      }
      {/* end mobile nav */}
      
      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-5 py-4 space-y-1">
                <span className="flex-center rounded-lg shadow-sm">
                  <Link to="/profile" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    My Profile
                  </Link>
                </span>
                <span className="flex-center rounded-lg shadow-sm">
                  <Link to="/editprofile" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    Edit Profile
                  </Link>
                </span>
                <span className="flex-center rounded-lg shadow-sm">
                  <Link to="/mypost" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    My Posts
                  </Link>
                </span>
                <span className="flex-center rounded-lg shadow-sm">
                  <Link to="/favpost" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    My Favourite Posts
                  </Link>
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button onClick={toggleMobileProfileMenu} className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
            {/* <!-- Heroicon name: menu --> */}
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
          <div className="pt-2 h-full pb-6 md:py-6">
            <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 md:px-8">
              {/* <!-- Main post content --> */}
                {children}
              {/* <!-- /End main post content --> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

