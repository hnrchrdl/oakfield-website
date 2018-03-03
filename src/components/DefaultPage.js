import './DefaultPage.css'

import React from 'react'

export default props => {
  return (
    <div className="default-page-container">
      {props.page && (
        <div
          className="content"

          dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
        />
      )}
    </div>
  )
}
