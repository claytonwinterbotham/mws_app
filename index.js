require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const port = process.env.port || 5000
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const { response } = require('express')

const API_URL = process.env.API_URL || 'http://localhost:1337'

const Google = {
    recaptcha : async (token) => {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        try {
            const response = await axios.post(url)
            const data = response.data
            return data
        }catch(error){
            return error
        }
    }
}

/* MIDDLEWARE */

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ name: 'jwt', keys: ['f|4K?6QUpLCs)v`P`!;&<e$+:3>q25'] }))

/* ROUTES */

app.post('/api/auth/local', async (req, res) => {
    try {
        const loginRes = await axios({
            method: 'POST',
            url: `${API_URL}/auth/local`,
            data: req.body
            
        })
        const {jwt, user} = loginRes.data
        req.session.jwt = jwt
        //console.log("req.session.jwt", req.session.jwt)
        const data = {user}

        res.send(data)

    }catch(error){
      res.status(400).send({error: error.response.data.message[0].messages[0].message})
    }
    
})

app.post('/api/auth/local/register', async (req, res) => {
    try {
        const registerRes = await axios({
            method: 'POST',
            url: `${API_URL}/auth/local/register`,
            data: req.body
        })
        res.send(registerRes.data)

    }catch(error){

        res.status(400).send({error: error.response.data.message[0].messages[0].message})
    }
   
})

app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        console.log(req.body)
        const forgotPasswordRes = await axios({
            method: 'POST',
            url: `${API_URL}/auth/forgot-password`,
            data: req.body
        })

        res.send(forgotPasswordRes.data)

    }catch(error){

        res.send(null)
    }
   
})

app.post('/api/auth/reset-password', async (req, res) => {
    console.log(req.body)
    try {
        const resetPasswordRes = await axios({
            method: 'POST',
            url: `${API_URL}/auth/reset-password`,
            data: req.body
        })

        res.send({message: "Successfully reset password"})

    }catch(error){

        res.status(403).send({error: error.response.data.message})
    }
   
})

app.post('/api/recaptcha', async (req, res) => {
    try {
        const recaptchaRes = await Google.recaptcha(req.body.token)
        const { score } = recaptchaRes

        if(!score){
            //console.log(recaptchaRes)
            throw new Error(recaptchaRes.success)
        }

        if(!score || score < 0.5){
           throw new Error("Your are a Robot")
        }

        res.status(200).send({message: "Not a Robot"})

    }catch(error){

        res.status(401).send(error.message)
    }
   
})

app.get('/api/getOneUser/:userId', async (req, res) => {
    try {
        const jwtToken = req.session.jwt
        const data = req.body
        const {userId} = req.params

        const getOneUserRes = await axios({
            method: 'PUT',
            url: `${API_URL}/users/${userId}`,
            data,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        //console.log("servers.js updateUserRes", updateUserRes.data)
        res.status(200).send(getOneUserRes.data)

    }catch(error){
        //console.log(error.response.data.message[0].messages[0].message)
        res.status(400).send({error: error.response.data.message[0].messages[0].message})
    }
    
})

app.put('/api/users/:userId', async (req, res) => {
    try {
        const jwtToken = req.session.jwt
        const data = req.body
        const {userId} = req.params

        const updateUserRes = await axios({
            method: 'PUT',
            url: `${API_URL}/users/${userId}`,
            data,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        //console.log("servers.js updateUserRes", updateUserRes.data)
        res.status(200).send(updateUserRes.data)

    }catch(error){
        //console.log(error.response.data.message[0].messages[0].message)
        res.status(400).send({error: error.response.data.message[0].messages[0].message})
    }
    
})

app.get('/api/users/me', async (req, res) => {
    try {
        const {jwt} = req.session
        const meRes = await axios({
            method: 'GET',
            url: `${API_URL}/users/me`,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        //console.log("meREs", meRes)
        res.send(meRes.data)
    }catch(error){
        //res.status(401).send({error: 'Not Authorized'})
        res.send(null)
    }
})

app.get('/api/users/logout', (req, res) => {
   req.session.jwt = null
   res.send({message: 'logged out'}) 
})

app.get('/api/getposts/:category/:start', async (req, res) => {
    try {
        const { category, start } = req.params
        //console.log("Start", req.params)
        const { jwt } = req.session
        const postsRes = await axios({
            method: 'GET',
            url: `${API_URL}/posts?category=${category}&_sort=created_at:DESC&_start=${start}&_limit=10`,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        //console.log("pagination response", postsRes.data)
        res.send(postsRes.data)
    }catch(error){
        res.status(401).send({error: 'Not Authorized'})
    }
})

app.get('/api/countposts/:category', async (req, res) => {
    try {
        const { category } = req.params
        const { jwt } = req.session
        const countPostsRes = await axios({
            method: 'GET',
            url: `${API_URL}/posts/count?category=${category}`,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        res.json(countPostsRes.data)
    }catch(error){
        res.send(error)
    }
})

app.get('/api/getmyposts/:userId', async (req, res) => {
    try {
        const jwtToken = req.session.jwt
        const data = req.body
        const {userId} = req.params

        const getOneUserRes = await axios({
            method: 'PUT',
            url: `${API_URL}/users/${userId}`,
            data,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        //console.log("servers.js updateUserRes", updateUserRes.data)
        res.status(200).send(getOneUserRes.data.posts)

    }catch(error){
        //console.log(error.response.data.message[0].messages[0].message)
        res.status(400).send({error: error.response.data.message[0].messages[0].message})
    }
    
})

app.post('/api/addpost', async (req, res) => {
    try {
        const { jwt } = req.session
        const addPostRes = await axios({
            method: 'POST',
            url: `${API_URL}/posts?_sort=created_at:`,
            data: req.body,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
       // console.log('add post request from api', addPostRes)
        res.send(addPostRes.data)
    }catch(error){

        res.status(400).send({error: error.response.data.message[0].messages[0].message})
    }
   
})

app.delete('/api/delmypost/:postId', async (req, res) => {
    try {
        const { jwt } = req.session
        const { postId } = req.params
        const delMyPostRes = await axios({
            method: 'DELETE',
            url: `${API_URL}/posts/${postId}`,
            data: req.body,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log('add fav post request from api', delMyPostRes)
        res.send(delMyPostRes.data)
    }catch(error){
        res.status(400).send(error)
    }
   
})

app.get('/api/getfavposts/:id', async (req, res) => {
    try {
        const { jwt } = req.session
        const { id } = req.params
        const getFavPostRes = await axios({
            method: 'GET',
            url: `${API_URL}/users/myfavposts/${id}`,
            data: req.body,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log('add fav post request from api', getFavPostRes.data.favourite_posts)
        res.send(getFavPostRes.data.favourite_posts)
    }catch(error){
        res.status(400).send(error)
    }
   
})

app.post('/api/addfavpost', async (req, res) => {
    try {
        const { jwt } = req.session
        const addFavPostRes = await axios({
            method: 'POST',
            url: `${API_URL}/favourite-posts`,
            data: req.body,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log('add fav post request from api', addFavPostRes)
        res.send(addFavPostRes.data)
    }catch(error){
        res.status(400).send(error)
    }
   
})

app.delete('/api/delfavpost/:postId', async (req, res) => {
    try {
        const { jwt } = req.session
        const { postId } = req.params
        console.log("from params")
        const addFavPostRes = await axios({
            method: 'DELETE',
            url: `${API_URL}/favourite-posts/${postId}`,
            data: req.body,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log('add fav post request from api', addFavPostRes)
        res.send(addFavPostRes.data)
    }catch(error){
        res.status(400).send(error)
    }
   
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

/* FINISH SETUP */
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))