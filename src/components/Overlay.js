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
import IconSpotify from '../graphics/icon-spotify'
import IconTwitter from '../graphics/icon-twitter'
import IconYoutube from '../graphics/icon-youtube'
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
      <div className="icon youtube">
        <a
          href="https://www.youtube.com/playlist?list=PLclkSsMLGD6plI6F5x_7KRb-9dEHiFvRK"
          target="_blank"
        >
          <IconYoutube />
        </a>
      </div>
      <div className="icon spotify">
        <a
          href="https://open.spotify.com/user/oakfieldfestival/playlist/4K154s8U6Rgtu8e4n8bEA6"
          target="_blank"
        >
          <IconSpotify />
        </a>
      </div>
      <div className="icon facebook">
        <a href="https://www.facebook.com/oakfieldfestival/" target="_blank">
          <IconFacebook />
        </a>
      </div>
      <div className="icon instagram" target="_blank">
        <a href="https://www.instagram.com/oakfieldfestival/">
          <IconInstagram />
        </a>
      </div>
      <div className="icon twitter">
        <a href="https://twitter.com/OakfieldFstvl" target="_blank">
          <IconTwitter />
        </a>
      </div>
      <div className="icon mail">
        <a href="mailto:info@oakfieldfestival.de" target="_blank">
          <IconMail />
        </a>
      </div>
    </div>
    <div className="overlay-item call-to-action">
      <a href="https://www.grandticket.de/Event/book/72631/" target="_blank">
        <CallToAction />
      </a>
    </div>
  </div>
)
