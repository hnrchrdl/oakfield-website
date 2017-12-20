import './Content.css'

import { PAGE_HEADER, PAGE_TOP, PAGE_WRAPPER } from '../env'

import { Element } from 'react-scroll'
import Footer from './Footer'
import Header from './Header'
import Overlay from './Overlay'
import Pages from './Pages'
import React from 'react'

const Content = props => {
  return (
    <div className="content">
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
      <Element id={PAGE_WRAPPER} name={PAGE_WRAPPER} className="page-wrapper">
        <Pages mainMenu={props.mainMenu} />
      </Element>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  )
}
export default Content
