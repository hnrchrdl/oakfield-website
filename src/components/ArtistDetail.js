import './ArtistDetail.css'

import React from 'react'

export default props => (
  <div className="artist-details">
    <div className="artist-details-wrapper">
      <div
        className="artist-image"
        style={{
          backgroundImage: `url(${
            props.artist.featured_image.available_sizes.large[0]
            })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div
        className="artist-title-wrapper"
        onClick={_ => props.handleShowArtistInfo(props.artist)}
      >
        <div className="artist-title">{props.artist.title.rendered}</div>
      </div>
    </div>
  </div>
)
