import './ArtistInfo.css'

import Modal from './Modal'
import React from 'react'

export default props => {
  if (props.artist) {
    return (
      <Modal handleModalClose={props.handleArtistInfoHide}>
        <div className="container">
          <h1 className="artist-info">{props.artist.title.rendered}</h1>
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
          </div>
        </div>
      </Modal>
    )
  } else {
    return null
  }
}
