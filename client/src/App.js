import React, { useState, useEffect } from 'react'
import { AuthContext } from './_context/auth'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './_components'
import HomePage from './HomePage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import ProfilePage from './ProfilePage'
import EditProfilePage from './EditProfilePage'
import ForgotPasswordPage from './ForgotPasswordPage'
import ResetPasswordPage from './ResetPasswordPage'
import PostsPage from './PostsPage'
import { FavPostPage } from './ProfilePage/favPosts'
import { MyPostPage } from './ProfilePage/myPosts'
import { Navbar } from './_components'
import { loadReCaptcha } from 'react-recaptcha-v3'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'
import { useQuery } from 'react-query'

const App = () => {

  const [authUser, setAuthUser] = useState('')
  const [loadingAuthUser, setLoadingAuthUser] = useState(true)
  
  useQuery('authorizeUser', async () => {
    const { data } = await axios({
      method: 'GET',
      url: '/api/users/me'
    })
    return data
  },{
   onSuccess: (data) => {
     setAuthUser(data)
     setLoadingAuthUser(false)
   },
   onError: () => {
     setLoadingAuthUser(false)
   },
   refetchOnWindowFocus: false
  })

  useEffect(() => {
    loadReCaptcha("6LdNlKkZAAAAAHKvrmuCJ5UFsDQ5ybaiIgYPKNM4")
  },[])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loadingAuthUser, setLoadingAuthUser }}>
      <BrowserRouter>
        <Navbar />
        <div className="">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgotpassword" component={ForgotPasswordPage} />
            <Route path="/resetpassword" component={ResetPasswordPage} />
            <PrivateRoute path="/posts/:category" component={PostsPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute path="/editprofile" component={EditProfilePage} />
            <PrivateRoute path="/mypost" component={MyPostPage} />
            <PrivateRoute path="/favpost" component={FavPostPage} />
          </Switch>
        </div>
        <ReactQueryDevtools />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App
