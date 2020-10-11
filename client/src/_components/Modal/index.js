import React from 'react'


export const Modal = ({ showModal, toggleModal, children }) => {
    const modalBackgroundStyle = showModal ? 'ease-in duration-300 opacity-100' : 'ease-in duration-200 opacity-0'
    const modalPaneStyle = showModal ? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100' : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
    return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
           
            <div onClick={toggleModal} className={`fixed inset-0 transition-opacity ${modalBackgroundStyle}`}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      
            <div className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ${modalPaneStyle} `} role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button onClick={toggleModal} type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
                    {/* <!-- Heroicon name: x --> */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    </div>
    )
}