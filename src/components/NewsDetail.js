import './NewsDetail.css'

import React from 'react'

export default props => (
  <div className="news-detail">
    {props.news.featured_image.url && (
      <img
        className="featured-image"
        src={props.news.featured_image.available_sizes.large[0]}
      />
    )}
    <h2 className="title">{props.news.title.rendered}</h2>
    <div className="content">
      {/* <div dangerouslySetInnerHTML={{ __html: props.news.excerpt.rendered }} /> */}
      <div dangerouslySetInnerHTML={{ __html: props.news.content.rendered }} />
    </div>
  </div>
)
