import axios from 'axios'

const register = (username, email, avatar, password, confirmPassword) => {
    const data = {
        username,
        email,
        avatar,
        password,
        confirmPassword
    }
    console.log('from register service', data)
    return axios({
        method: 'POST',
        url: '/api/auth/local/register',
        data
    }).then((response) => {
        return response.data
    })
}

const login = (email, password) => {
    const data = {
        identifier: email,
        password
    }

    return axios({
        method: 'POST',
        url: '/api/auth/local',
        data
    })
    .then((response) =>{
        return response.data
    })
}

const forgotPassword = (email) => {
    const data = {
        email
    }
    return axios({
        method: 'POST',
        url: '/api/auth/forgot-password',
        data
    })
    .then((response) => {
        return response.data
    })
}

const resetPassword = (code, password, passwordConfirmation) => {
    const data = {
        code,
        password,
        passwordConfirmation
    }
    return axios({
        method: 'POST',
        url: '/api/auth/reset-password',
        data
    })
    .then((response) => {
        return response.data
    })
}

const getCurrentUser = () => {
    return axios({
        method: 'GET',
        url: '/api/users/me'
    }).then((response) => {
        return response.data
    })
}


const logout = () => {
    return axios({
        method: 'GET',
        url: '/api/users/logout'
    }).then((response) => {
        
    })
}

const recaptcha = (token) => {
    const data = {
       token
    }
    return axios({
        method: 'POST',
        url: '/api/recaptcha',
        data
    })
    .then((response) => {
        
        return response.data
    })
}

export default {
    register,
    login,
    logout, 
    getCurrentUser,
    forgotPassword,
    resetPassword,
    recaptcha
}
