import React from 'react'
import { PostItemSkeleton } from '../PostItemSkeleton'

const posts = [1,2,3,4,5,6,7,8,9,10]

export const PostListSkeleton = () => {
    const listPostsElement = posts.map((_post, index)=>{
        return <PostItemSkeleton key={index}/>
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

