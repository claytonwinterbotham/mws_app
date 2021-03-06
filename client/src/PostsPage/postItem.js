import React, {useState, useEffect, useCallback} from 'react'
import userService from '../_services/user.service'
import helpers from '../_helpers/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/pro-light-svg-icons'
import { useMutation, queryCache } from 'react-query'
import { useAuth } from '../_context/auth'
import axios from 'axios'

const PostItem = ({post, favPosts, category, start}) => {
    const [favourite, setFavourite] = useState(false)
    const [favPostId, setFavPostId] = useState(null)
    const { authUser, } = useAuth()
    
    const [addFavPost, ] = useMutation( async () => {
        const data = {
            user: authUser.id,
            post: post.id
        }
        await axios({
            method: 'POST',
            url: '/api/addfavpost',
            data
        })
    },{
        onSuccess: () => {
            setFavourite(true)
            queryCache.invalidateQueries('posts')
        }
    })

    const [delFavPost, ] = useMutation( async () => {
        await axios({
            method: 'DELETE',
            url: `/api/delfavpost/${favPostId}`,
        })
    },{
        onSuccess: () => {
            setFavourite(false)
            queryCache.invalidateQueries('posts')
        }
    })

    const toggleFavourite = () => {

        if(!favourite){
            addFavPost()
        }

        if(favourite){
            delFavPost()
        }
    }

    const isFavPost = useCallback((post) => {
        post.find((item) => {
            if(item.user === authUser.id){
                setFavourite(true)
                setFavPostId(item.id)
            }
        })
    }, [authUser.id])

    useEffect(() => {
       isFavPost(favPosts)
    },[favPosts, isFavPost])

    const avatarText = authUser.avatar === "#ffffff" ? 'text-black' : 'text-white'

    return (
        <div className="border-b-2 border-gray-100 py-5">
            <div className="flex justify-between">
                <div>
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 ${helpers.setCategoryColor(post.category)}`}>
                        {helpers.capitalize(post.category)}
                    </span>
                </div>
                
                <div>
                    <FontAwesomeIcon className="cursor-pointer" onClick={toggleFavourite} color={favourite ? "#F56565" : "#A0AEC0" } size={"2x"} icon={faHeart} />
                </div>
                
            </div>
                <h3 className="mt-4 text-xl leading-7 font-semibold text-gray-900">
                    {post.title}
                </h3>
                <p className="mt-3 text-base leading-6 text-gray-500">
                    {post.description}
                </p>
                <p className="mt-3 text-base leading-6 text-gray-500">
                    {post.link}
                </p>
            <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="mt-1">
                                <div className="flex items-center">
                                    <span
                                        style={{ backgroundColor: post.user.avatar }} className="inline-flex items-center justify-center h-10 w-10 rounded-full shadow bg-gray-500">
                                        <span className={`font-medium leading-none ${avatarText}`}>
                                            {userService.getUserInitials(post.user.username)}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-3">
                    <p className="text-sm leading-5 font-medium text-gray-900">
                        {post.user.username}
                    </p>
                    <div className="flex text-sm leading-5 text-gray-500">
                        <time>
                            {new Date(post.created_at).toLocaleDateString(
                              'en-gb',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }  
                            )}
                        </time>
                    </div>
                </div>
            </div>
        </div>
    )
  }

export default PostItem
