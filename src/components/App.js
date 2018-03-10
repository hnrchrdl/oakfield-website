import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { getAppSetup, getPages } from '../utils/api'

import Content from './Content'
import Error from './Error'
import Loading from './Loading'
import { PAGE_TOP } from '../env'
import StaticTeaser from './StaticTeaser'
import Toastr from './Toastr'
import { sendBewerbung } from '../utils/api'

const WAIT_START_SCREEN_MIN = 0

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      app: null,
      scrolled: false,
      pages: null,
      toastrMessages: []
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
          registerForms(this);
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
                  this.handleSetActive(id, element, history))}
                scrolled={this.state.scrolled}
                pages={this.state.pages}
              />
              <Toastr messages={this.state.toastrMessages} />
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
  showToastr(message, { error = false } = {}) {
    this.setState(state => {
      return {
        toastrMessages: [...state.toastrMessages, { message, error }]
      }
    })
    setTimeout(_ => {
      this.setState(state => {
        if (state.toastrMessages.length > 1) {
          return {
            toastrMessages: state.toastrMessages.filter((item, idx) => idx !== 0)
          }
        }
        return {
          toastrMessages: []
        }
      })
    }, 5000);
  }
}

export default App

function registerForms(component) {
  setTimeout(_ => {
    const forms = document.querySelectorAll('.wpcf7 form')
    forms.forEach(form => {
      if (form.attachEvent) {
        form.attachEvent("submit", (e) => processForm(e, form))
      } else {
        form.addEventListener("submit", (e) => processForm(e, form))
      }
    });
  }, 5000)

  function processForm(e, form) {
    if (e.preventDefault) e.preventDefault()
    const formData = new FormData(form)
    if (formData.get('_wpcf7') === '2895') {
      if (!formData.get('accept[]')) {
        component.showToastr('Bitte Teilnahmebedinungen akzeptieren.', { error: true });
      }
      else if (!formData.get('band-name')) {
        component.showToastr('Bitte Bandnamen angeben.', { error: true });
      }
      else if (!formData.get('your-name')) {
        component.showToastr('Bitte Ansprechpartner angeben.', { error: true });
      }
      else if (!formData.get('email')) {
        component.showToastr('Keine Email angegeben.', { error: true });
      }
      else if (!/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(formData.get('email'))) {
        component.showToastr('Keine gültige Email-Adresse.', { error: true });
      }
      else if (!formData.get('link')) {
        component.showToastr('Bitte Link zum Bewerbungssong angeben.', { error: true });
      }
      else if (!formData.get('plz')) {
        component.showToastr('Bitte Postleitzahl angeben.', { error: true });
      }
      else if (!formData.get('bl')) {
        component.showToastr('Bitte Bundesland angeben.', { error: true });
      }
      else if (!formData.get('text')) {
        component.showToastr('Bitte Vorstellungstext angeben.', { error: true });
      }
      else {
        const formDataObj = {};
        for (const [key, value] of formData.entries()) {
          formDataObj[key] = value;
        }
        sendBewerbung({ data: formDataObj }).then(_ => {
          form.reset();
          component.showToastr('Deine Bewerbung wurde erfolgreich versandt!');
        }, (err) => {
          component.showToastr('Mailversand leider nicht erfolgreich. Bitte erneut versuchen.', { error: true });
        })
      }
    }
    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
  }

}