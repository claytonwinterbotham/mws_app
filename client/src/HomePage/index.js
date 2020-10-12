import React from 'react'
import { Pie, Hero } from '../_components'

export const HomePage = () => {

  const data = [
    { title: 'Emotional', value: 60, color: '#FACA15' },
    { title: 'Spiritual', value: 60, color: '#CABFFD' },
    { title: 'Personal', value: 60, color: '#F8B4D4' },
    { title: 'Professional', value: 60, color: '#84E1BC' },
    { title: 'Physical', value: 60, color: '#F8B4B4' },
    { title: 'Psychological', value: 60, color: '#7EDCF2' },
  ];

  return (
    <div>
       <Hero />
       <div className="relative py-16 bg-white mt-8 overflow-hidden max-w-screen-md mx-auto">
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
            <div className="relative h-full text-lg max-w-prose mx-auto">
              <svg className="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
                <defs>
                  <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
              </svg>
              <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
                <defs>
                  <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
              </svg>
              <svg className="absolute bottom-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
                <defs>
                  <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto mb-6">
              <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">Self-care Wheel</h1>
              <p className="text-xl text-gray-500 leading-8">Practicing self-care means to nurture all aspects of our being. Create balance in your life by using the self-care wheel to tend to the needs of each part of yourself. Click on each category of self-care. You will discover new practices and be able to add your own to share with others.</p>
            </div>
          </div>
       </div>
       <div className="max-w-screen-md mx-auto">
          <Pie data={data} />
       </div>
    </div>
  );
}

export default HomePage

