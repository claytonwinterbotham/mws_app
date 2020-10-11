import axios from 'axios'

const getAllPosts = async (category, start) => {
    const response = await axios({
        method: 'GET',
        url: `/api/getposts/${category}/${start}`,
    })
    return response
}

const countPosts = async (category) => {
    const response = await axios({
        method: 'GET',
        url: `/api/countposts/${category}`,
    })
    return response
}

const addPost = async (title, description, link, user, category) => {
    const data = {
        title,
        description,
        link,
        user,
        category
    }
    console.log('data.service.js addPost', data)
    const response = await axios({
        method: 'POST',
        url: '/api/addpost',
        data
    })
    return response.data
}

const addFavPost = async (user, post) => {
    const data = {
        user,
        post
    }
    console.log('data.service.js addFavPost', data)
    const response = await axios({
        method: 'POST',
        url: '/api/addfavpost',
        data
    })
    return response.data
}


export default {
    getAllPosts,
    countPosts,
    addPost
}