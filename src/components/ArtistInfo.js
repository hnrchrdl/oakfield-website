import './ArtistInfo.css'

import Modal from './Modal'
import React from 'react'

export default props => {
  if (props.artist) {
    console.log(props.artist)
    const ytLinks = props.artist.youtube_url.split(',')
    return (
      <Modal handleModalClose={props.handleArtistInfoHide}>
        <div className="container">
          <h1 className="artist-info">
            {props.artist.title.rendered}
            {props.artist.from && <span> ({props.artist.from})</span>}
          </h1>
          <div className="artist-info-wrapper">
            <img
              className="artist-info-image"
              src={props.artist.featured_image.available_sizes.medium}
            />
            <div
              className="artist-info-content"
              dangerouslySetInnerHTML={{
                __html: props.artist.content.rendered
              }}
            />
            {ytLinks.map((link, idx) => (
              <div key={idx} class="artist-info-content">
                <div class="video-container">
                  <iframe
                    class="video"
                    width="560"
                    height="315"
                    src={link}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    )
  } else {
    return null
  }
}
