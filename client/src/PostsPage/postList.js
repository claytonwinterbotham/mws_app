import React from 'react'
import PostItem from './postItem'

const PostList = ({ posts, category, start }) => {
    const listPostsElement = posts.map((post, index) => {
        return (
            <PostItem key={index} post={post} favPosts={post.favourite_posts} index={index} category={category} start={start} />
        ) 
    })
    return (
        <div className="bg-white pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
            <div className="relative max-w-lg mx-auto lg:max-w-7xl">
                <div className="mt-12 grid gap-16 lg:grid-cols-1 lg:col-gap-5 lg:row-gap-12">
                    {listPostsElement}
                </div>
            </div>
        </div>
    )
  }

export default PostList
