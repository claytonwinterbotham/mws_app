import axios from 'axios'

const updateUser = (data, userId) => {
    console.log("user.service.updateUser", )
    return axios({
        method: 'PUT',
        url: `/api/users/${userId}`,
        data
    }).then((response) => {
        console.log("client updateUser", response.data)
        return response.data
    })
}

const getUserInitials = ( username) => {
    return username.charAt(0).toUpperCase()
}

export default {
    updateUser,
    getUserInitials
}