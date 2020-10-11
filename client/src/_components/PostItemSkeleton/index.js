import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const PostItemSkeleton = ({post}) => {
    return (
        <div className="border-b-2 border-gray-100 py-5">
            <div >
                <span className="inline-flex items-center px-3 py-0.5 w-20 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                    <Skeleton />
                </span>
            </div>
                <h3 className="mt-4 text-xl leading-7 font-semibold text-gray-900">
                    <Skeleton />
                </h3>
                <p className="mt-3 text-base leading-6 text-gray-500">
                    <Skeleton count={2} />
                </p>
                <p className="mt-3 text-base leading-6 text-gray-500">
                    <Skeleton />
                </p>
            <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="mt-1">
                                <div className="flex items-center">
                                    <span
                                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                                        
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-3">
                    <p className="text-sm leading-5 font-medium text-gray-900">
                        <Skeleton />
                    </p>
                    <div className="flex text-sm leading-5 text-gray-500">
                        <Skeleton />
                    </div>
                </div>
            </div>
        </div>
    )
  }

