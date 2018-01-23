import './NewsDetail.css'

import React from 'react'

export default props => (
  <div className="news-detail">
    <h2 className="title">{props.news.title.rendered}</h2>
    <div class="content">
      <div dangerouslySetInnerHTML={{ __html: props.news.excerpt.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: props.news.content.rendered }} />
    </div>
  </div>
)
