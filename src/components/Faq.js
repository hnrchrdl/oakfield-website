import './Faq.css'

import React, { Component } from 'react'

import { BASE_URL } from '../env'
import Error from './Error'
import Loading from './Loading'
import { getFAQ } from '../utils/api'

export default class Faq extends Component {
  state = {
    faq: null,
    error: null,
    loading: true,
    showing: 0
  }
  componentDidMount() {
    getFAQ()
      .then(faq => {
        const loading = false
        this.setState({ faq, loading })
      })
      .catch(error => this.setState({ error }))
  }
  render() {
    const { faq, loading, error } = this.state

    if (faq && !loading) {
      return this.renderFaqList(faq)
    } else if (error) {
      return this.renderError(error)
    } else if (loading) {
      return this.renderLoading()
    }
  }

  renderFaqList(faqList) {
    if (faqList.length > 0) {
      return (
        <div className="faq-container">
          {faqList.map((faq, idx) => (
            <div key={faq.id}>
              <div className="faq">
                <div
                  onClick={_ => this.setState({ showing: idx })}
                  className="title"
                  dangerouslySetInnerHTML={{ __html: faq.title.rendered }}
                />
                <div
                  className={`content ${
                    this.state.showing === idx ? ' shown' : ' hidden'
                  }`}
                  dangerouslySetInnerHTML={{ __html: faq.content.rendered }}
                />
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return <div>Keine FAQ vorhanden.</div>
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
