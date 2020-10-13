import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/pro-light-svg-icons'
import { faEyeSlash } from '@fortawesome/pro-light-svg-icons'
import { faSpinner } from '@fortawesome/pro-light-svg-icons'
import { ReCaptcha } from 'react-recaptcha-v3'
import './style.css'

import authService from '../_services/auth.service'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const ResetPasswordPage = (props) => {

  const recaptcha = useRef()

  let query = useQuery()
  const code = query.get('code')

  const { register, handleSubmit, errors, reset, watch } = useForm()
  const [ submitErrorMessage, setSubmitErrorMessage ] = useState('')
  const [ showSubmitMessage, setShowSubmitMessage ] = useState(false)
  const [ loading, setLoading ] = useState('')
  const [ passwordShown, setPasswordShown ] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(``)

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true)
  }
  
  const onSubmit = data => {
    setLoading(true)
    authService.recaptcha(recaptchaToken)
      .then((response) => {
        resetPassword(code, data.password, data.confirmPassword) // login user post request
      })
      .catch((error)=> {
        const errorMessage = "Unable to submit. Try again later."
        setSubmitErrorMessage(errorMessage)
        setLoading(false)
      })
  }

  const watchPassword = watch('password') //watch password value and match confirmPassword value to it

  const resetPassword = (code, password, passwordConfirmation) => {
    authService.resetPassword(code, password, passwordConfirmation)
      .then((response)=>{
        setSubmitErrorMessage('')
        setShowSubmitMessage(true)
        setLoading(false)
        reset()
      })
      .catch((error) => {
        const errorMessage = error.response.data.error[0].messages[0].message
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
      <img className="mx-auto h-12 w-auto" src="https://res.cloudinary.com/dy3c6sc72/image/upload/v1602630842/my_whole_self/logo_no_text_zlwevg.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>
    
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form name="form" ref={register} onSubmit={handleSubmit(onSubmit)}>
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
            {submitErrorMessage && <p className="text-red-500 text-xs italic mt-3">{submitErrorMessage}</p>}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit" disabled={showSubmitMessage} className="w-full inline-flex items-center justify-center mt-12 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600 transition ease-in-out duration-150">
                  Reset Password
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
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* <!-- Heroicon name: exclamation --> */}
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 text-green-700">
                  Password is reset.{" "}
                  <Link to="/login" className="font-medium underline text-yellow-700 hover:text-green-600 transition ease-in-out duration-150">
                  Go sign in.
                  </Link>
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

export default ResetPasswordPage
