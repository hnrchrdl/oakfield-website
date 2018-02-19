import './Impressum.css'

import React, { Component } from 'react'

export default class Impressum extends Component {
  componentDidMount() {}
  render() {
    return (
      <div class="impressum-container">
        <h1>Impressum</h1>
        <div
          className="impressum-content container"
          dangerouslySetInnerHTML={{
            __html: this.props.page.content.rendered
          }}
        />
      </div>
    )
  }
}
