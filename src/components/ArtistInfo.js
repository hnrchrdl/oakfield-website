import './ArtistInfo.css'

import Modal from './Modal'
import React from 'react'

export default props => {
  if (props.artist) {
    const ytLinks = props.artist.youtube_embed_url
      ? props.artist.youtube_embed_url.split(',')
      : []
    return (
      <Modal handleModalClose={props.handleArtistInfoHide}>
        <div className="container">
          <h1 className="artist-info">
            {props.artist.title.rendered}
            {props.artist.from && <span> ({props.artist.from})</span>}
          </h1>
          <div className="artist-info-wrapper">
            <div className="artist-info-image-wrapper">
              <img
                className="artist-info-image"
                src={props.artist.featured_image.available_sizes.large[0]}
              />
              {(props.artist.youtube_url || props.artist.spotify_url || props.artist.bandcamp_url) && (
                <div className="artist-info-links">
                  {props.artist.spotify_url && <span><a target="_blank" href={props.artist.spotify_url}>Spotify</a></span>}
                  {props.artist.youtube_url && <span><a target="_blank" href={props.artist.youtube_url}>Youtube</a></span>}
                  {props.artist.bandcamp_url && <span><a target="_blank" href={props.artist.bandcamp_url}>Bandcamp</a></span>}
                </div>
              )}
            </div>
            <div
              className="artist-info-content"
              dangerouslySetInnerHTML={{
                __html: props.artist.content.rendered
              }}
            />
            {ytLinks.map((link, idx) => (
              <div key={idx} className="artist-info-content">
                <div className="video-container">
                  <iframe
                    className="video"
                    width="560"
                    height="315"
                    src={link.trim()}
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
