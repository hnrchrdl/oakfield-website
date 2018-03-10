import './Footer.css'

import React, { Component } from 'react'
import { getMedienpartner, getSponsoren } from '../utils/api'

import DefaultPage from './DefaultPage'
import Modal from './Modal'

export default class Footer extends Component {
  state = {
    sponsors: [],
    partners: [],
    showModalName: null
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
                <a href={sponsor.link}>
                  <img src={sponsor.featured_image.url} />
                </a>
              </div>
            ))}
          </div>
          <div className="info-text">Medienpartner des Oakfield Festivals</div>
          <div className="image-container partner">
            {(this.state.partners || []).map(partner => (
              <div className="image" key={partner.id}>
                <a href={partner.link}>
                  <img src={partner.featured_image.url} />
                </a>
              </div>
            ))}
          </div>
          <div className="info-text">
            Alle Rechte vorbehalten © 2018 Oakfield Festival.
          </div>
          <div className="info-text links">
            <a href=""
              onClick={e => {
                e.preventDefault()
                this.setState({ showModalName: 'kontakt' })
              }}>Kontakt</a> |
            <a
              href=""
              onClick={e => {
                e.preventDefault()
                this.setState({ showModalName: 'impressum' })
              }}
            >
              Impressum
            </a> |
            <a href=""
              onClick={e => {
                e.preventDefault()
                this.setState({ showModalName: 'datenschutz' })
              }}
            >Datenschutz</a> |
            <a href=""
              onClick={e => {
                e.preventDefault()
                this.setState({ showModalName: 'presse' })
              }}
            >Presse</a> |
            <a href=""
              onClick={e => {
                e.preventDefault()
                this.setState({ showModalName: 'agb' })
              }}
            > AGB</a>
          </div>
        </div>
        {this.state.showModalName && (
          <Modal
            handleModalClose={_ => this.setState({
              showModalName: null
            })}
          >
            <div className="container">
              <DefaultPage page={this.props[this.state.showModalName]} />
            </div>
          </Modal>
        )}
      </div>
    )
  }
}
