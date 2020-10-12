import React from 'react'
import AddPost from './addPost'
const MobilePostForm = ({ category, user, start, showMobilePostForm, toggleMobilePostForm}) => {

    const mobilePostBackgroundStyle = showMobilePostForm ? 'transition-opacity ease-linear duration-300 opacity-100' : 'transition-opacity ease-linear duration-300 opacity-0'  
    return (
        <div className="md:hidden">
          <div className="fixed inset-0 flex z-40">
       
            <div className={`fixed inset-0 ${mobilePostBackgroundStyle}`}>
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
         
            <div className="relative flex-1 flex flex-col w-full pt-5 pb-4 bg-white">
              <div className="absolute top-0 right-0 p-1">
                <button onClick={toggleMobilePostForm} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-orange-200" aria-label="Close sidebar">
                  <svg className="h-6 w-6 text-black" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4">
                <img className="mr-auto h-6 w-auto" src="https://res.cloudinary.com/dy3c6sc72/image/upload/v1602530946/my_whole_self/mhs_logo_kjmhdf.svg" alt="Workflow" />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-4 space-y-1">
                  <AddPost category={category} start={start} user={user} toggleMobilePostForm={toggleMobilePostForm}/>
                </nav>
              </div>
            </div>
          </div>
        </div>
    )
  }

export default MobilePostForm
