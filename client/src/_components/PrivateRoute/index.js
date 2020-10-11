import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../_context/auth'

export const PrivateRoute = ({ component: Component, ...rest}) => {

  const { authUser, loadingAuthUser } = useAuth()
  
  if(loadingAuthUser){
      return (
        <div>
            
        </div>
      )
  }
 
  return (
        <Route {...rest} render={props =>
            authUser ? (
                <Component {...props} />
            ) : (
                <Redirect to='/login' />
            )
        } 
        />
    );
}
