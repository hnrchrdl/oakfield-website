import './StaticTeaser.css'

import React from 'react'

const StaticTeaser = props => {
  return (
    <div className="fullscreen-wrapper">
      <video
        id="teaser-vid"
        video="true"
        autobuffer="true"
        muted={true}
        loop={true}
        preload="none"
        ref={el => {
          if (el) {
            if (props.paused) {
              el.pause()
            } else {
              el.play()
            }
          }
        }}
      >
        <source id="mp4" src={props.videoUrl || null} type="video/mp4" />
      </video>
    </div>
  )
}
export default StaticTeaser
