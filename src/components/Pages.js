import './Pages.css'

import React, { Component } from 'react'

import { Element } from 'react-scroll'
import Loading from './Loading'
import NewsList from './NewsList'
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
                {this.renderPageTitle(menuItem.page.title.rendered)}
                {this.renderPageContent(menuItem.page.slug)}
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

  renderPageTitle(title) {
    return <h1 className="title">{title}</h1>
  }
  renderPageContent(slug) {
    switch (slug) {
      case 'news':
        return <NewsList />
      default:
        return null
    }
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
