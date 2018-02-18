import './Footer.css'

import React, { Component } from 'react'
import { getMedienpartner, getSponsoren } from '../utils/api'

export default class Footer extends Component {
  state = {
    sponsors: [],
    partners: []
  }

  componentDidMount() {
    Promise.all([getSponsoren(), getMedienpartner()]).then(
      ([sponsors, partners]) => {
        console.log(sponsors, partners)
        this.setState({
          sponsors: sponsors,
          partners: partners
        })
      }
    )
  }
  render() {
    console.log(this.state.partners)
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
            <a href="kontakt">Kontakt</a> |
            <a href="impressum">Impressum</a> |
            <a href="datenschutz">Datenschutz</a> |
            <a href="Presse">Presse</a> |
            <a href="AGB">AGB</a>
          </div>
        </div>
      </div>
    )
  }
}
