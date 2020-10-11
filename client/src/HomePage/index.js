import React from 'react'
import { Pie } from '../_components'

export const HomePage = () => {

  const data = [
    { title: 'Emotional', value: 60, color: '#7CC7DF' },
    { title: 'Spiritual', value: 60, color: '#6EC1DB' },
    { title: 'Personal', value: 60, color: '#61BCD8' },
    { title: 'Professional', value: 60, color: '#53B6D5' },
    { title: 'Physical', value: 60, color: '#46B0D1' },
    { title: 'Psychological', value: 60, color: '#8ACDE2' },
  ];

  return (
    <div>
       <div className="max-w-screen-md mx-auto">
          <Pie data={data} />
       </div>
    </div>
  );
}

export default HomePage

