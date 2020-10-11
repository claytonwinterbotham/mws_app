import React, { useState } from "react"
import { PieChart } from 'react-minimal-pie-chart'
import { useHistory } from 'react-router-dom'

export const Pie = (props) => {

  let history = useHistory()
  const [hovered, setHovered] = useState(undefined)

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: '#D15A7C',
      };
    }
    return entry;
  })
  return ( 
    <PieChart
      style={{
        // fontFamily:
        //   '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '3px',
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={100}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === hovered ? 1 : 0)}
      animate
      label={({ dataEntry }) => dataEntry.title}
      labelPosition={65}
      labelStyle={{
        fill: '#fff',
        opacity: 1,
        pointerEvents: 'none',
      }}
      onClick={(event, index) => {
        history.push(`posts/${data[index].title}`)
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  )
}
