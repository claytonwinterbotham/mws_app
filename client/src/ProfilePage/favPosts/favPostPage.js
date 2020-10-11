import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../_context/auth'
import { ProfilePageLayout } from '../../_components'
import { FavPostList } from './favPostList'
import { PostListSkeleton } from '../../_components'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export const FavPostPage = () => {
    const { authUser, } = useAuth()

    const getFavPosts = useQuery(['getFavPosts', authUser.id],  async () => {
        const { data } = await axios({
            method: 'GET',
            url: `/api/getfavposts/${authUser.id}`
        })
        return data
    },{
        onSuccess: (data) => {
            queryCache.invalidateQueries(["posts"])
        }
    })

    const count = getFavPosts.data ? getFavPosts.data.length : 0

    return (
        <ProfilePageLayout>
            <nav className="flex items-center text-sm leading-5 font-medium">
                <Link to="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
                Home
                </Link>
                <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to={`/favpost`}  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">
                My Favourite Posts
                </Link>
            </nav>
            <div className="hidden mt-4 sm:block">
                <p className="text-sm leading-5 text-gray-700">Showing <span className="font-medium">{count} </span> results </p>
            </div>
            {getFavPosts.isLoading || getFavPosts.isFetching ? 
                <PostListSkeleton />
                : getFavPosts.isError ?
                'Error!'
                : getFavPosts.isSuccess && getFavPosts.data.length < 1 ?
                'You have no favourite posts yet :('
                : (
                <FavPostList posts={getFavPosts.data}></FavPostList>
            )}
        </ProfilePageLayout>
    );
}

