import React from 'react'
import helpers from '../../_helpers/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons'
import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from '../../_context/auth'
import axios from 'axios'

export const MyPostItem = ({ post }) => {
    const { authUser, } = useAuth()
    const queryCache = useQueryCache()

    const [delMyPost, ] = useMutation( async () => {
        await axios({
            method: 'DELETE',
            url: `/api/delmypost/${post.id}`,
        })
    },{
        onSuccess: () => {
            queryCache.invalidateQueries(['getMyPosts', authUser.id])
            queryCache.invalidateQueries('posts')
        }
    })

    return (
        <div className="border-b-2 border-gray-100 py-5">
            <div className="flex justify-between">
                <div>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                        {helpers.capitalize(post.category)}
                    </span>
                </div>
                
                <div>
                    <FontAwesomeIcon className="cursor-pointer" onClick={delMyPost} color={"#F56565"} size={"2x"} icon={faTrashAlt} />
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
                <div className="ml-3">
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

