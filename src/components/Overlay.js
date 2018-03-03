import './Overlay.css'

import {
  PAGE_WRAPPER,
  SCROLL_DURATION,
  SCROLL_OFFSET,
  SCROLL_SMOOTHING
} from '../env'

import Bands from '../graphics/overlay-bands'
import CallToAction from '../graphics/icon-call-to-action'
import CallToActionInfo from '../graphics/icon-call-to-action-info'
import Date from '../graphics/overlay-date'
import IconArrowDown from '../graphics/icon-down'
import IconFacebook from '../graphics/icon-facebook'
import IconInstagram from '../graphics/icon-instagram'
import IconMail from '../graphics/icon-mail'
import IconTwitter from '../graphics/icon-twitter'
import { Link } from 'react-scroll'
import Logo from '../graphics/overlay-logo'
import React from 'react'

export default _ => (
  <div id="overlay">
    <div className="overlay-item logo">
      <Logo />
    </div>
    <div className="overlay-item date">
      <Date />
    </div>
    <div className="overlay-item bands">
      <Bands />
    </div>
    <div className="overlay-item social-media">
      <div className="icon facebook">
        <a href="https://www.facebook.com/oakfieldfestival/">
          <IconFacebook />
        </a>
      </div>
      <div className="icon instagram">
        <a href="https://www.instagram.com/oakfieldfestival/">
          <IconInstagram />
        </a>
      </div>
      <div className="icon twitter">
        <a href="https://twitter.com/OakfieldFstvl">
          <IconTwitter />
        </a>
      </div>
      <div className="icon mail">
        <a href="mailto:info@oakfieldfestival.de">
          <IconMail />
        </a>
      </div>
    </div>
    <div className="overlay-item call-to-action">
      <a href="https://tinyurl.com/Oakfield2018tickets">
        <CallToAction />
      </a>
    </div>
    {/* <div className="overlay-item more">
      <Link
        to={PAGE_WRAPPER}
        className="link"
        spy={true}
        smooth={SCROLL_SMOOTHING}
        offset={SCROLL_OFFSET}
        duration={SCROLL_DURATION}
      >
        <IconArrowDown />
      </Link>
    </div> */}
  </div>
)
