import './Content.css'

import { PAGE_HEADER, PAGE_TOP, PAGE_WRAPPER } from '../env'

import { Element } from 'react-scroll'
import Footer from './Footer'
import Header from './Header'
import Overlay from './Overlay'
import Pages from './Pages'
import React from 'react'
import { Route } from 'react-router-dom'

const BASE_PATHS = ['/', '/news', '/kuenstler', '/tickets', '/faq', '/bewerben']

const Content = props => {
  const impressum = props.pages
    ? props.pages.find(page => page.slug === 'impressum')
    : null
  const datenschutz = props.pages
    ? props.pages.find(page => page.slug === 'datenschutz')
    : null
  const agb = props.pages
    ? props.pages.find(page => page.slug === 'agb')
    : null
  const presse = props.pages
    ? props.pages.find(page => page.slug === 'presse')
    : null
  const kontakt = props.pages
    ? props.pages.find(page => page.slug === 'kontakt')
    : null
  return (
    <div className="content-wrapper">
      <Element id={PAGE_TOP} name={PAGE_TOP} className="overlay-wrapper">
        <Overlay />
      </Element>
      <Element id={PAGE_HEADER} name={PAGE_HEADER}>
        <Header
          fixed={true}
          mainMenuItems={props.mainMenu}
          socialMenuItems={props.socialMenu}
          handleSetActive={props.handleSetActive}
        />
      </Element>
      {BASE_PATHS.map(path => (
        <Route
          key={path}
          exact
          path={path}
          render={() => (
            <Element
              id={PAGE_WRAPPER}
              name={PAGE_WRAPPER}
              className="page-wrapper"
            >
              <Pages pages={props.pages} mainMenu={props.mainMenu} />
            </Element>
          )}
        />
      ))}
      <div className="footer-wrapper">
        <Footer kontakt={kontakt} impressum={impressum} agb={agb} presse={presse} datenschutz={datenschutz} />
      </div>
    </div>
  )
}
export default Content
