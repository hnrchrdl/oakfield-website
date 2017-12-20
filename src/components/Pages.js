import './Pages.css'

import React, { Component } from 'react'

import { Element } from 'react-scroll'
import { getPages } from '../utils/api'

class Pages extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    getPages()
      .then(pages => {
        this.setState({ loading: false, pages })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    console.log(this.props.mainMenu, this.state.pages)
    const menu = this.props.mainMenu.map(menuItem => ({
      ...menuItem,
      page: this.state.pages
        ? this.state.pages.find(p => menuItem.object_id === p.id.toString())
        : null
    }))
    if (!this.state.loading) {
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
    if (this.state.error) {
      return (
        <div className="container error">{this.state.error.toString()}</div>
      )
    }
    if (this.state.loading) {
      return <div className="container">loading pages...</div>
    }
  }
}
export default Pages
