import './ArtistList.css'

import React, { Component } from 'react'

import ArtistDetails from './ArtistDetail'
import ArtistInfo from './ArtistInfo'
import Error from './Error'
import Loading from './Loading'
import { getArtists } from '../utils/api'

export default class ArtistList extends Component {
  state = {
    artists: null,
    loading: true,
    error: null,
    artistInfo: null
  }

  showArtistInfo = artist => {
    console.log(artist)
    this.setState({
      artistInfo: artist
    })
  }

  hideArtistInfo = () => {
    console.log('hide')
    this.setState({
      artistInfo: null
    })
  }

  componentDidMount() {
    getArtists()
      .then(artists => {
        console.log('artists', artists)
        const loading = false
        this.setState({ artists, loading })
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const { artists, loading, error } = this.state

    if (artists && !loading) {
      return this.renderArtistList(artists)
    } else if (error) {
      return this.renderError(error)
    } else if (loading) {
      return this.renderLoading()
    }
  }

  renderArtistList(artists) {
    if (artists.length > 0) {
      return (
        <div className="artist-list">
          {artists.map(artistDetail => (
            <ArtistDetails
              key={artistDetail.id}
              artist={artistDetail}
              handleShowArtistInfo={this.showArtistInfo}
            />
          ))}
          <ArtistInfo
            artist={this.state.artistInfo}
            handleArtistInfoHide={this.hideArtistInfo}
          />
        </div>
      )
    } else {
      return <div>Keine Künstler vorhanden.</div>
    }
  }

  renderError(error) {
    return <Error errorMsg={error.toString()} />
  }

  renderLoading() {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    )
  }
}
