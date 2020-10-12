import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-light-svg-icons'
import { ReCaptcha } from 'react-recaptcha-v3'
import './style.css'

import authService from '../_services/auth.service'

const REGEX_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const ForgotPasswordPage = (props) => {

  // use useRef to count how many times component re-renders
  const recaptcha = useRef()

  const { register, handleSubmit, errors, reset } = useForm()
  const [ submitErrorMessage, setSubmitErrorMessage ] = useState('')
  const [ showSubmitMessage, setShowSubmitMessage ] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(``)

  const onSubmit = data => {
    console.log(data)
    setLoading(true)
    authService.recaptcha(recaptchaToken)
      .then((response) => {
        forgotPassword(data.email)
      })
      .catch((error)=> {
        const errorMessage = "Unable to submit. Try again later."
        setSubmitErrorMessage(errorMessage)
        setLoading(false)
      })
    
  }

  const forgotPassword = (email) => {
    authService.forgotPassword(email)
      .then((response) => {
        setSubmitErrorMessage('')
        setShowSubmitMessage(true)
        setLoading(false)
        reset()
      })
      .catch((error) => {
        setLoading(false)
        setSubmitErrorMessage("Email invalid. Try again later")
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
          Forgot Password
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
            {submitErrorMessage && <p className="text-red-500 text-xs italic mt-3">{submitErrorMessage}</p>}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit" disabled={showSubmitMessage} className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600 transition ease-in-out duration-150">
                  submit
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
          {showSubmitMessage &&
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* <!-- Heroicon name: exclamation --> */}
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 text-yellow-700">
                  Check your email for a link to reset your password.
                </p>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
    );
}

export default ForgotPasswordPage
