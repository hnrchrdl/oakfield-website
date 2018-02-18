import React from 'react'

const defaultStyle = {
  fill: '#222',
  fillOpacity: 1,
  fillRule: 'nonzero',
  stroke: 'none'
}

export default props => {
  const style = { ...defaultStyle, ...props.style }
  return (
    <svg version="1.1" viewBox="0 0 25 25" height="100%">
      <g id="Hamburger" style={style}>
        <path d="M0,2 L25,2 L25,6 L0,6 L0,2 Z M0,10 L25,10 L25,14 L0,14 L0,10 Z M0,18 L25,18 L25,22 L0,22 L0,18 Z" />
      </g>
    </svg>
  )
}
