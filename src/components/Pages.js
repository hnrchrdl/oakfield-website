import './Pages.css'

import React, { Component } from 'react'

import ArtistList from './ArtistList'
import DefaultPage from './DefaultPage'
import { Element } from 'react-scroll'
import Faq from './Faq'
import Loading from './Loading'
import NewsList from './NewsList'
import Tickets from './Tickets'

class Pages extends Component {
  render() {
    const menu = this.props.mainMenu.map(menuItem => ({
      ...menuItem,
      page: this.props.pages
        ? this.props.pages.find(p => menuItem.object_id === p.id.toString())
        : null
    }))

    return this.renderPages(menu)
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
            {menuItem.page.slug != 'partner' && (
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
            )}
            <div className="page-pusher" />
            {/* {idx !== menu.length - 1 && <div className="divider" />} */}
          </Element>
        ))}
      </div>
    )
  }

  renderPageTitle(title) {
    return title != 'Partner' ? <h1 className="title">{title}</h1> : null
  }
  renderPageContent(page) {
    switch (page.slug) {
      case 'news':
        return <NewsList />
      case 'kuenstler':
        return <ArtistList />
      case 'tickets':
        return <Tickets page={page} />
      case 'faq':
        return <Faq />
      case 'partner':
        return null
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
