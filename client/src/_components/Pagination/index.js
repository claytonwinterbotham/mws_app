import React, {Fragment} from 'react'

export const Pagination = ({display, count, start, setStart, limit, setLimit, page, setPage}) => {

    const numPages = Math.ceil(count/10)
  
    //console.log('numOfPages', numPages)

    const handleNextPage = () => {
    //if button not disabled
        setPage((old) => old + 1)
        setStart((old) => old + limit)
    }
    
    const handlePreviousPage = () => {
    //if button not disabled
        setPage((old) => old - 1)
        setStart((old) => old - limit) 
    }

    return (
        <nav className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="hidden sm:block">
                {
                display && count > limit ? (
                    <Fragment>
                        <p className="text-sm leading-5 text-gray-700">
                        Showing{" "}
                        {/* Start is indexed at zero so show 1 if equal to zero */}
                            <span className="font-medium">{start === 0 ? 1 : start} </span>to{" "} 
                            <span className="font-medium">
                            {(page === numPages) ? count : start + limit}
                            {" "}
                            </span> 
                            of{" "}<span className="font-medium">{count} </span>results{" "}
                        </p>
                    </Fragment>):(
                        <p className="text-sm leading-5 text-gray-700">Showing <span className="font-medium">{count} </span> results </p>
                        )
                    }
            </div>
            {
            display > limit && (
                <div className="flex-1 flex justify-between sm:justify-end">
                
                    <button onClick={handlePreviousPage} disabled={page === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    Previous
                    </button>
            
                    
                    <button onClick={handleNextPage} disabled={page === numPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    Next
                    </button>
            
                </div>)
            }
        </nav>
    )
}