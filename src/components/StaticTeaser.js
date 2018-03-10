import './StaticTeaser.css'

import React from 'react'

const StaticTeaser = props => {
  return (
    <div className="fullscreen-wrapper">
      {/* <video
        id="teaser-vid"
        video="true"
        autobuffer="true"
        muted={true}
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
        * <source id="mp4" src={props.videoUrl || null} type="video/mp4" />
        
         <source id="mp4" src={props.videoUrl || null} type="video/mp4" />
      </video> */}

      <div className="video-background">
        {(window.innerWidth > 1200 && (
          <div className="video-foreground">
            <iframe
              width="100%"
              height="100%"
              className="video"
              src="https://www.youtube.com/embed/1dc0z3ghcMU?modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1&loop=1&mute=1&playlist=1dc0z3ghcMU"
              frameBorder="0" allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        )) || (
            <div className="static-teaser-img" />
          )}
      </div>
    </div>
  )
}
export default StaticTeaser
