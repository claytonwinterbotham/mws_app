import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-light-svg-icons'
import { ReCaptcha } from 'react-recaptcha-v3'
import './style.css'

import { useAuth } from '../_context/auth'
import authService from '../_services/auth.service'

const REGEX_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginPage = (props) => {

  // use useRef to count how many times component re-renders
  const recaptcha = useRef()

  const { register, handleSubmit, errors, reset } = useForm()
  const [ submitErrorMessage, setSubmitErrorMessage ] = useState('')
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(``)

  const { setAuthUser } = useAuth()

  const onSubmit = data => {
    setLoading(true)
    authService.recaptcha(recaptchaToken)
      .then((response) => {
        loginUser(data.email, data.password)
      })
      .catch((error)=> {
        const errorMessage = "Unable to submit. Try again later."
        setSubmitErrorMessage(errorMessage)
        setLoading(false)
      })
    
  }

  const loginUser = (email, password) => {
    authService.login(email, password)
      .then((response) => {
        setSubmitErrorMessage('')
        reset()
        setAuthUser(response.user)
        setLoading(false)
        props.history.push('/profile')
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="https://res.cloudinary.com/dy3c6sc72/image/upload/v1602532535/my_whole_self/logo_no_text_mtojk1.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Login
        </h2>
      </div>
    
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form name="form" ref={register} onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input 
                  id="password"
                  name="password" 
                  type="password"
                  ref={register({
                    required: "Required",
                    minLength: 5
                  })} 
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              {errors.password?.type === "minLength" && <p className="mt-2 text-sm text-red-600">Must be at least 5 characters</p>}
            </div>

            <div className="mt-6 flex items-center justify-between">
            <div className="text-sm leading-5">
                <Link to="/register" className="font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Not registered yet?
                </Link>
              </div>
              <div className="text-sm leading-5">
                <Link to="forgotpassword" className="font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Forgot your password?
                </Link>
              </div>
            </div>
            {submitErrorMessage && <p className="text-red-500 text-xs italic mt-3">{submitErrorMessage}</p>}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit" className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600 transition ease-in-out duration-150">
                  Login
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

export default LoginPage
