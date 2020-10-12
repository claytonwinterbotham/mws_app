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
       <div className="max-w-screen-md mx-auto">
          <Pie data={data} />
       </div>
    </div>
  );
}

export default HomePage

