import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/pro-light-svg-icons'
import { faEyeSlash } from '@fortawesome/pro-light-svg-icons'
import { faSpinner } from '@fortawesome/pro-light-svg-icons'
import { ReCaptcha } from 'react-recaptcha-v3'
import { CompactPicker } from 'react-color'
import './style.css'

import authService from '../_services/auth.service'

const REGEX_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegisterPage = (props) => {

  const recaptcha = useRef()

  const { register, handleSubmit, errors, reset, watch } = useForm()
  const [ submitErrorMessage, setSubmitErrorMessage ] = useState('')
  const [ loading, setLoading ] = useState('')
  const [ passwordShown, setPasswordShown ] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(``)
  const [avatarColor, setAvatarColor] = useState('#0694A2')
  const [showColorPicker, setShowColorPicker] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const onSubmit = data => {
    setLoading(true)
    authService.recaptcha(recaptchaToken)
      .then((response) => {
        registerUser(data.username, data.email, avatarColor, data.password, data.confirmPassword) // register user post request
      })
      .catch((error)=> {
        const errorMessage = "Unable to submit. Try again later."
        setSubmitErrorMessage(errorMessage)
      })
    
  }

  const watchPassword = watch('password') //watch password value and match confirmPassword value to it

  const registerUser = async (username, email, avatar, password, confirmPassword) => {
    authService.register(username, email, avatar, password, confirmPassword)
    .then(
      (response)=>{
      setSubmitErrorMessage('')
      props.history.push('/profile')
      reset()
    })
    .catch((error) => {
      const errorMessage = error.response.data.error
      setLoading(false)
      setSubmitErrorMessage(errorMessage)
      updateToken()
    })

  }

  const verifyCallback = (recaptchaToken) => {
    setRecaptchaToken(recaptchaToken)
  }

  const updateToken = () => {
    recaptcha.current.execute()
  }

  const handleChangeComplete = (color) => {
    setAvatarColor(color.hex)
  }

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Register your account
        </h2>
      </div>
    
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form name="form" ref={register} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
                Username/Alias
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input 
                  id="username"
                  name="username" 
                  type="text" 
                  ref={register({
                    required: true,
                    minLength: 3
                  })} 
                  className="
                    appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                    placeholder-gray-400 focus:outline-none focus:shadow-outline-blue 
                    focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" 
                />
              </div>
              {errors.username?.type === "required" && <p className="mt-2 text-sm text-red-600">Required</p>}
              {errors.username?.type === "minLength" && <p className="mt-2 text-sm text-red-600">Must be at least 3 characters</p>}
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input 
                id="email"
                name="email" 
                type="email" 
                ref={register({
                  required: "Required",
                  pattern: {
                    value: REGEX_PATTERN,
                    message: "Invalid email address"
                  }
                })} 
                className="
                  appearance-none block w-full px-3 py-2 border 
                  border-gray-300 rounded-md placeholder-gray-400 
                  focus:outline-none focus:shadow-outline-blue 
                  focus:border-blue-300 transition duration-150 
                  ease-in-out sm:text-sm sm:leading-5" 
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="mt-6">
              <label htmlFor="avatar" className="block text-sm font-medium leading-5 text-gray-700">
                Avatar Colour
              </label>
              <div className="mt-1">
                <div className="flex items-center">
                  <span className="h-12 w-12 shadow rounded-full" style={{ backgroundColor: avatarColor }}>
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
    
            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input 
                  id="password"
                  name="password" 
                  type={passwordShown ? "text" : "password"}
                  ref={register({
                    required: "Required",
                    minLength: 5
                  })} 
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span 
                    onClick={togglePasswordVisibility}>
                      {passwordShown ? <FontAwesomeIcon icon={faEyeSlash} color="#63b3ed" /> : <FontAwesomeIcon icon={faEye} color="#63b3ed" />}
                  </span>
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              {errors.password?.type === "minLength" && <p className="mt-2 text-sm text-red-600">Must be at least 5 characters</p>}
            </div>
            

            <div className="mt-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-5 text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type={passwordShown ? "text" : "password"}
                  ref={register({
                    required: "Required",
                    minLength: 5,
                    validate: value => value === watchPassword
                  })}  
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span 
                    onClick={togglePasswordVisibility}>
                      {passwordShown ? <FontAwesomeIcon icon={faEyeSlash} color="#63b3ed" /> : <FontAwesomeIcon icon={faEye} color="#63b3ed" />}
                  </span>
                </div>
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              {errors.confirmPassword?.type === "minLength" && <p className="mt-2 text-sm text-red-600">Must be at least 5 characters</p>}
              {errors.confirmPassword?.type === "validate" && <p className="mt-2 text-sm text-red-600">Passwords must match</p>}
            </div>
    
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm leading-5">
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Already registered?
                </Link>
              </div>
            </div>
            {submitErrorMessage && <p className="text-red-500 text-xs italic mt-3">{submitErrorMessage}</p>}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Register now
                  {loading 
                    ? (
                    <FontAwesomeIcon className="ml-3 -mr-1 h-5 w-5" icon={faSpinner} color="#63b3ed" spin />
                  ) :
                    <div className="ml-3 -mr-1 h-5 w-5">
                    </div>
                  }
                </button>
              </span>
            </div>
            <ReCaptcha
              ref={(e) => {
                recaptcha.current = e
              }}
              sitekey='6LdNlKkZAAAAAHKvrmuCJ5UFsDQ5ybaiIgYPKNM4'
              action='login_form'
              verifyCallback={verifyCallback}
            />
          </form>
        </div>
      </div>
    </div>
    );
}

export default RegisterPage
