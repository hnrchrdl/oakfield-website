import './Footer.css'

import React, { Component } from 'react'
import { getMedienpartner, getSponsoren } from '../utils/api'

import Impressum from './Impressum'
import Modal from './Modal'

export default class Footer extends Component {
  state = {
    sponsors: [],
    partners: [],
    showImpressum: false
  }

  componentDidMount() {
    Promise.all([getSponsoren(), getMedienpartner()]).then(
      ([sponsors, partners]) => {
        this.setState({
          sponsors: sponsors,
          partners: partners
        })
      }
    )
  }
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="info-text">
            Das Oakfield Festival wird unterstützt von
          </div>
          <div className="image-container sponsors">
            {(this.state.sponsors || []).map(sponsor => (
              <div className="image" key={sponsor.id}>
                <img src={sponsor.featured_image.url} />
              </div>
            ))}
          </div>
          <div className="info-text">Medienpartner des Oakfield Festivals</div>
          <div className="image-container partner">
            {(this.state.partners || []).map(partner => (
              <div className="image" key={partner.id}>
                <img src={partner.featured_image.url} />
              </div>
            ))}
          </div>
          <div className="info-text">
            Alle Rechte vorbehalten © 2018 Oakfield Festival.
          </div>
          <div className="info-text links">
            <a href="#">Kontakt</a> |
            <a
              href=""
              onClick={e => {
                e.preventDefault()
                this.setState({ showImpressum: true })
              }}
            >
              Impressum
            </a>{' '}
            |
            <a href="#">Datenschutz</a> |
            <a href="#">Presse</a> |
            <a href="#">AGB</a>
          </div>
        </div>
        {this.state.showImpressum && (
          <Modal
            handleModalClose={_ => this.setState({ showImpressum: false })}
          >
            <Impressum page={this.props.impressum} />
          </Modal>
        )}
      </div>
    )
  }
}
