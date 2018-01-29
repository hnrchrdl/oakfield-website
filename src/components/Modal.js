import './Modal.css'

import IconExit from '../graphics/icon-exit'
import React from 'react'

export default props => {
  console.log(props.handleModalClose)
  return (
    <div className="modal">
      {props.children}
      <div className="exit" onClick={props.handleModalClose}>
        <IconExit />
      </div>
    </div>
  )
}
