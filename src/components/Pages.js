import './Pages.css'

import React, { Component } from 'react'

import { Element } from 'react-scroll'
import Loading from './Loading'
import { getPages } from '../utils/api'

class Pages extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    getPages()
      .then(pages => {
        const loading = false
        this.setState({ pages, loading })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const menu = this.props.mainMenu.map(menuItem => ({
      ...menuItem,
      page: this.state.pages
        ? this.state.pages.find(p => menuItem.object_id === p.id.toString())
        : null
    }))

    if (!this.state.loading) {
      return this.renderPages(menu)
    } else if (this.state.error) {
      return this.renderError()
    } else if (this.state.loading) {
      return this.renderLoading()
    }
  }

  renderPages(menu) {
    return (
      <div className="pages">
        {menu.map(menuItem => (
          <Element
            id={`page-${menuItem.object_id}`}
            name={menuItem.ID.toString()}
            key={menuItem.ID}
          >
            {menuItem.page ? (
              <div className="container">
                <h1>{menuItem.page.title.rendered}</h1>
              </div>
            ) : (
              <div className="container error">
                Seite {menuItem.title} konnte nicht gefunden werden.
              </div>
            )}
          </Element>
        ))}
      </div>
    )
  }

  renderError() {
    return <div className="container error">{this.state.error.toString()}</div>
  }

  renderLoading() {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    )
  }
}
export default Pages
