import './Tickets.css'

import React, { Component } from 'react'

import Error from './Error'
import Loading from './Loading'
import { getTickets } from '../utils/api'

export default class Tickets extends Component {
  state = {
    tickets: null,
    loading: true,
    error: null
  }
  componentDidMount() {
    getTickets()
      .then(tickets => {
        const loading = false
        this.setState({ tickets, loading })
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const { tickets, loading, error } = this.state

    if (tickets && !loading) {
      return this.renderTickets(tickets)
    } else if (error) {
      return this.renderError()
    } else if (loading) {
      return this.renderLoading()
    }
  }

  renderTickets(tickets) {
    if (tickets.length > 0) {
      return (
        <div className="ticket-list">
          {tickets.map(ticket => (
            <a key={ticket.id} href={ticket.link}>
              <div className="ticket">
                <div className="ticket-title">{ticket.title.rendered}</div>
                <div className="ticket-price">{ticket.price}</div>
                <div className="ticket-description">{ticket.description}</div>
              </div>
            </a>
          ))}
        </div>
      )
    } else {
      return <div>Keine Tickets vorhanden.</div>
    }
  }

  renderError() {
    return <Error errorMsg={this.state.error.toString()} />
  }

  renderLoading() {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    )
  }
}
