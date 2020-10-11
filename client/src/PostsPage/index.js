import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PostList from './postList'
import { PostListSkeleton } from '../_components'
import AddPost from './addPost'
import helpers from '../_helpers'
import './style.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Modal, Pagination } from '../_components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons'
import MobilePostFormContainer from './mobilePostFormContainer'
import { useAuth } from '../_context/auth'

const PostsPage = () => {
  const [start, setStart] = useState(0)
  const [ limit, setLimit ] = useState(10)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showMobilePostForm, setShowMobilePostForm] = useState(false)
  const { category } = useParams() //get category from url
  const { authUser, } = useAuth()

  const postsCountQuery = useQuery(["posts", category],  async () => {
    const { data } = await axios({
      method: 'GET',
      url: `/api/countposts/${category}`
    })
    return data
  })

  const postsQuery = useQuery(["posts", category, start], async () => {
    const { data } = await axios({
      method: 'GET',
      url: `/api/getposts/${category}/${start}`,
    })
    return data
  }, {
    enabled: postsCountQuery.data,
  })

  const toggleModal = () => {
    setShowModal(state => !state)
  }

  const toggleMobilePostForm = () => {
    setShowMobilePostForm(state => !state)
  }

  return (
    <div className="h-screen flex overflow-hidden">

        {showMobilePostForm && <MobilePostFormContainer category={category} start={start} user={authUser} showMobilePostForm={showMobilePostForm} toggleMobilePostForm={toggleMobilePostForm}/>}
      
        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
            <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-5 py-4 space-y-1">
                  <span className="flex-center rounded-lg shadow-sm">
                    <button onClick={toggleModal} type="button" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                      New Post
                    </button>
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Show mobile add post form */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">

          {/* Start show mobile add post form */}
          <button onClick={toggleMobilePostForm} className="absolute z-10 right-12  bottom-8 mb-16 h-22 w-22 shadow-xl bg-teal-100 rounded-full text-teal-500 focus:outline-none focus:bg-teal-200 focus:text-teal-600 md:hidden" aria-label="Open sidebar">
            <FontAwesomeIcon size="4x" icon={faPlusCircle} />
          </button>
          {/* End show mobile add post form */}

          <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <nav className="flex items-center text-sm leading-5 font-medium">
                  <Link to="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
                    Home
                  </Link>
                  <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <Link to={`/posts/${category}`}  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
                    {helpers.capitalize(category)}
                  </Link>
                </nav>

                {/* start pagination */}
                <Pagination 
                  display={postsCountQuery.data} 
                  count={postsCountQuery.data} 
                  start={start} 
                  setStart={setStart}
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                />
                {/* ended pagination */}



                {/* <!-- Main post content --> */}
                
                  {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div> */}
                  {postsCountQuery.data < 1 ?
                    "Sorry no posts yet :(" :
                    postsQuery.isLoading || postsQuery.isFetching || postsQuery.isIdle ? 
                    <PostListSkeleton />
                    : postsQuery.isError ?
                    'Error!'
                    : (
                    <PostList loading={postsQuery.isLoading} posts={postsQuery.data} category={category} start={start}></PostList>
                  )}
                {/* <!-- /End main post content --> */}


                {/* start pagination */}
                <Pagination 
                  display={postsCountQuery.data} 
                  count={postsCountQuery.data} 
                  start={start} 
                  setStart={setStart}
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                />
                {/* ended pagination */}
              </div>
            </div>
          </main>
        </div>
        {showModal && (
          <Modal showModal={showModal} toggleModal={toggleModal}>
            <AddPost category={category} start={start} user={authUser} toggleModal={toggleModal} />
          </Modal>
        )}
    </div>
  );
}

export default PostsPage
