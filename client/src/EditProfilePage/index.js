import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, queryCache } from 'react-query'
import { CompactPicker } from 'react-color'
import { ProfilePageLayout, Spinner } from '../_components'
import { useAuth } from '../_context/auth'
import axios from 'axios'
import userService from '../_services/user.service'

const REGEX_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const EditProfilePage = () => {
  const { authUser } = useAuth()
  const [submitError, setSubmitError] = useState(false)
  const [avatarColor, setAvatarColor] = useState(authUser.avatar)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      username: authUser.username,
      email: authUser.email
    }
  })

  const [updateUser, {isLoading} ] = useMutation( async (data) => {
    await axios({
      method: 'PUT',
      url: `/api/users/${authUser.id}`,
      data
    })
  },{
    onSuccess: () => {
      queryCache.invalidateQueries('authorizeUser')
      setSubmitError(false)
    },
    onError: () => {
      setSubmitError(true)
    }
  })

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      avatar: avatarColor
    }
    updateUser(userData)
  }

  const handleChangeComplete = (color) => {
    setAvatarColor(color.hex)
  }

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker)
  }

  const avatarText = avatarColor === "#ffffff" ? 'text-black' : 'text-white'

  if(isLoading){
    console.log("loading")
    return(
      <ProfilePageLayout>
        <Spinner />
      </ProfilePageLayout>

    )
  }

  return (
    <ProfilePageLayout>
      <nav className="flex items-center text-sm leading-5 font-medium">
          <Link to="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
          Home
          </Link>
          <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
          </svg>
          <Link to={`/editprofile`}  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
          Edit Profile
          </Link>
      </nav>
      <div className="mt-10">
        <form name="form" ref={register} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Profile
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  The Username/Alias will be displayed publicly so be careful what you share.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
                    Username/Alias
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                       id="username" 
                       name="username"
                       type="text"
                       ref={register({
                         required: true,
                         minLength: 3
                       })}
                       className="flex-1 form-input block w-full min-w-0 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" 
                    />
                  </div>
                  {errors.username?.type === "required" && <p className="mt-2 text-sm text-red-600">Required</p>}
                  {errors.username?.type === "minLength" && <p className="mt-2 text-sm text-red-600">Must be at least 3 characters</p>}
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="avatar" className="block text-sm leading-5 font-medium text-gray-700">
                    Avatar 
                  </label>
                  <div className="mt-2 flex items-center">
                    <span
                      style={{ backgroundColor: avatarColor }} className="inline-flex items-center justify-center h-10 w-10 rounded-full shadow bg-gray-500">
                        <span className={`font-medium leading-none ${avatarText}`}>
                          {userService.getUserInitials(authUser.username)}
                        </span>
                    </span>
                    <span className="ml-5 rounded-md shadow-sm">
                      <button onClick={toggleColorPicker} type="button" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                        {!showColorPicker ? 'Change' : 'Close'}
                      </button>
                    </span>
                  </div>
                  {
                    showColorPicker && (
                      <CompactPicker
                        onChangeComplete={ handleChangeComplete }
                      />
                    )
                  }
                </div>
              </div>
            </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input 
                      id="email" 
                      type="email"
                      name="email"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: REGEX_PATTERN,
                          message: "Invalid email address"
                        }
                      })}
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>
          </div>
          {submitError && <p className="mt-2 text-sm text-red-600">Unable to update profile. Try again later.</p>}
          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-end">
              <span className="ml-3 inline-flex rounded-md shadow-sm">
                <button type="submit" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600 transition ease-in-out duration-150">
                  Save
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </ProfilePageLayout> 
  );
}

export default EditProfilePage
