import './Pages.css'

import React, { Component } from 'react'

import ArtistList from './ArtistList'
import DefaultPage from './DefaultPage'
import { Element } from 'react-scroll'
import Faq from './Faq'
import Loading from './Loading'
import NewsList from './NewsList'
import Tickets from './Tickets'
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
        {menu.map((menuItem, idx) => (
          <Element
            className="page-wrapper"
            key={menuItem.ID}
            id={`page-${menuItem.object_id}`}
            name={menuItem.ID.toString()}
          >
            <div className="page">
              {menuItem.page ? (
                <div className="container">
                  {this.renderPageTitle(menuItem.page.title.rendered)}
                  {this.renderPageContent(menuItem.page)}
                </div>
              ) : (
                <div className="container error">
                  Seite {menuItem.title} konnte nicht gefunden werden.
                </div>
              )}
            </div>
            <div className="page-pusher" />
            {/* {idx !== menu.length - 1 && <div className="divider" />} */}
          </Element>
        ))}
      </div>
    )
  }

  renderPageTitle(title) {
    return <h1 className="title">{title}</h1>
  }
  renderPageContent(page) {
    switch (page.slug) {
      case 'news':
        return <NewsList />
      case 'kuenstler':
        return <ArtistList />
      case 'tickets':
        return <Tickets />
      case 'faq':
        return <Faq />
      default:
        return <DefaultPage page={page} />
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
