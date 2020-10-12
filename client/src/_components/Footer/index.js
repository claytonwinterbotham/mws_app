import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = (props) => {

 
  return ( 
    <footer className="bg-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden space-y-8 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <Link to="/privacy" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
          {/* <div className="px-5 py-2">
            <Link to="/terms" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Terms and Conditions
            </Link>
          </div> */}
        </nav>
        <p className="mt-8 text-center text-base leading-6 text-gray-400">
          &copy; 2020 My Whole Self
        </p>
      </div>
    </footer>
  )
}
