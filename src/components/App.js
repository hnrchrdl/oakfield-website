import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { getAppSetup, getPages } from '../utils/api'

import Content from './Content'
import Error from './Error'
import Loading from './Loading'
import { PAGE_TOP } from '../env'
import StaticTeaser from './StaticTeaser'

const WAIT_START_SCREEN_MIN = 1000

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      app: null,
      scrolled: false,
      pages: null
    }
  }

  componentDidMount() {
    const mountTime = Date.now()
    Promise.all([getAppSetup(), getPages()])
      .then(([setup, pages]) => {
        // setup Page
        // but wait at least 1s to avoid too much flickering
        let waitTime = WAIT_START_SCREEN_MIN - (mountTime - Date.now())
        waitTime = waitTime < 0 ? 0 : waitTime
        setTimeout(_ => {
          this.setState({ app: setup, pages: pages })
        }, waitTime)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleSetActive(id, element, history) {
    // handle scrolling events
    // if id of target element is not page-top or header
    // the app is considered to be scrolled, e.g. the main content is shown
    this.setState({ scrolled: id !== PAGE_TOP })
    // if (id !== PAGE_TOP) {
    //   history.push('/')
    // } else {
    //   //history.push(`/${id}`)
    // }
  }

  render() {
    if (this.state.app && !this.state.error) {
      return this.renderApp()
    } else if (this.state.error) {
      return this.renderError()
    } else {
      return this.renderLoading()
    }
  }

  renderApp() {
    return (
      <Router>
        <Route
          render={({ history }) => (
            <div className="App">
              <StaticTeaser
                paused={this.state.scrolled}
                videoUrl={this.state.app ? this.state.app.teaserVid.url : null}
              />
              <Content
                mainMenu={this.state.app.mainMenu}
                socialMenu={this.state.app.socialMenu}
                handleSetActive={((id, element) =>
                  this.handleSetActive(id, element, history)).bind(this)}
                scrolled={this.state.scrolled}
                pages={this.state.pages}
              />
            </div>
          )}
        />
      </Router>
    )
  }
  renderError() {
    return <Error errorMsg={this.state.error.toString()} />
  }
  renderLoading() {
    return <Loading />
  }
}

export default App
