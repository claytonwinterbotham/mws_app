import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, queryCache } from 'react-query'
import helpers from '../_helpers/index'
import axios from 'axios'

const AddPost = ({ category, start, user, toggleModal, toggleMobilePostForm }) => {

    const { register, handleSubmit, errors } = useForm()

    const [addPost, addPostInfo] = useMutation( async ({title, description, link}) => {
      const data = {
          title,
          description,
          link,
          user: user.id,
          category
      }
      console.log('post data', data)
      await axios({
          method: 'POST',
          url: '/api/addpost',
          data
      })
  },
  {
    onSuccess: () => {
      toggleModal && toggleModal()
      toggleMobilePostForm && toggleMobilePostForm()
      queryCache.invalidateQueries("posts")
    }
  }
  )

  const handleCancel = () => {
    toggleModal && toggleModal()
    toggleMobilePostForm && toggleMobilePostForm()
  }

  return (
    <form name="form" ref={register} onSubmit={handleSubmit(addPost)}>
      <div>
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add new post
            </h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">
              Please share a thought, idea, or resource for the{" "} 
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                    {helpers.capitalize(category)}
              </span> category.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

            <div className="mt-6 sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
                Title
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input 
                  id="title"
                  name="title"
                  type="text"
                  ref={register({
                    required: "Required",
                    minLength: 3,
                  })} 
                  className="flex-1 form-input block w-full min-w-0 rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
              {errors.title?.type === "required" && <p className="mt-2 text-sm text-red-600">Required</p>}
              {errors.title?.type === "minLength" && <p className="mt-2 text-sm text-red-600">Must be at least 3 characters</p>}
            </div>
    
            <div className="mt-6 sm:col-span-6">
              <label htmlFor="details" className="block text-sm font-medium leading-5 text-gray-700">
                Description (max 500 characters)
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <textarea 
                  id="description"
                  name="description"
                  type="text"
                  ref={register({
                    required: "Required",
                    minLength: 3,
                    maxLength: 500
                  })} 
                  rows="4" 
                  className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                </textarea>
              </div>
              {errors.description?.type === "required" && <p className="mt-2 text-sm text-red-600">Required</p>}
              {errors.description?.type === "minLength" && <p className="mt-2 text-sm text-red-600">Must be at least 3 characters</p>}
              {errors.description?.type === "maxLength" && <p className="mt-2 text-sm text-red-600">Exceeds 750 characters</p>}
            </div>

            <div className="mt-6 sm:col-span-4">
              <label htmlFor="link" className="block text-sm font-medium leading-5 text-gray-700">
                Share a link (optional)
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input 
                id="link"
                name="link"
                ref={register()}
                placeholder="http://www.yourlink.com" 
                className="flex-1 form-input block w-full min-w-0 rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>

          </div>
        </div>
      </div>
      {addPostInfo.isError && (
        <p className="text-red-500 text-xs italic mt-3">
          Error submitting post. Please try again later.
        </p>)}
      <div className="mt-8 border-t border-gray-200 pt-5">
        <div className="flex justify-end">
          <span className="inline-flex rounded-md shadow-sm">
            <button onClick={handleCancel} type="button" className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
              Cancel
            </button>
          </span>
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              {addPostInfo.isLoading 
                ? 'Saving...'
                : addPostInfo.isError
                ? 'Error!'
                : addPostInfo.isSuccess
                ? 'Saved!'
                : 'Submit' }
            </button>
          </span>
        </div>
      </div>
    </form>
    )
  }

export default AddPost
