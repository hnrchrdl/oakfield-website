import React, { Component } from 'react'

import Content from './Content'
import Loading from './Loading'
import { PAGE_TOP } from '../env'
import StaticTeaser from './StaticTeaser'
import { getAppSetup } from '../utils/api'

const WAIT_START_SCREEN_MIN = 1000

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      app: null,
      scrolled: false
    }
  }

  componentDidMount() {
    const mountTime = Date.now()
    getAppSetup()
      .then(data => {
        // setup Page
        // but wait at least 1s to avoid too much flickering
        let waitTime = WAIT_START_SCREEN_MIN - (mountTime - Date.now())
        waitTime = waitTime < 0 ? 0 : waitTime
        setTimeout(_ => {
          this.setState({ app: data })
        }, waitTime)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleSetActive(id, element) {
    // handle scrolling events
    // if id of target element is not page-top or header
    // the app is considered to be scrolled, e.g. the main content is shown
    this.setState({ scrolled: id !== PAGE_TOP })
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
      <div className="App">
        <StaticTeaser
          paused={this.state.scrolled}
          videoUrl={this.state.app ? this.state.app.teaserVid.url : null}
        />
        <Content
          mainMenu={this.state.app.mainMenu}
          socialMenu={this.state.app.socialMenu}
          handleSetActive={this.handleSetActive.bind(this)}
          scrolled={this.state.scrolled}
        />
      </div>
    )
  }
  renderError() {
    return <div class="container error">{this.state.error.toString()}</div>
  }
  renderLoading() {
    return <Loading />
  }
}

export default App
