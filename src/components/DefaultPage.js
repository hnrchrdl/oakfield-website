import './DefaultPage.css'

import React, { Component } from 'react'

export default props => {
  return (
    <div className="default-page-container">
      <div
        className="default-page-content"
        dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
      />
    </div>
  )
}
