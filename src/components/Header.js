import './Header.css'

import {
  PAGE_HEADER,
  PAGE_TOP,
  SCROLL_DURATION,
  SCROLL_OFFSET,
  SCROLL_SMOOTHING
} from '../env'

import { Link } from 'react-scroll'
import OverlayLogo from '../graphics/overlay-logo'
import React from 'react'

const Header = props => {
  return (
    <div
      className={
        'header-wrapper' +
        (props.fixed ? ' fixed' : '') +
        (props.hidden ? ' hidden' : '')
      }
    >
      {props.fixed && (
        <div className="logo">
          <Link
            to={PAGE_TOP}
            spy={false}
            smooth={SCROLL_SMOOTHING}
            offset={SCROLL_OFFSET}
            duration={SCROLL_DURATION}
            onSetActive={props.handleSetActive}
          >
            {/* O A K F I E L D */}
            {/* <HeaderLogo style={{ fill: '#222' }} /> */}
            <OverlayLogo style={{ fill: '#222' }} height="100%" />
          </Link>
        </div>
      )}
      <div className="header-items">
        <ul>
          {[
            ...props.mainMenuItems,
            { ID: PAGE_TOP, title: 'Oben', post_status: 'publish' },
            { ID: PAGE_HEADER, title: 'Navbar', post_status: 'publish' }
          ].map(
            item =>
              item.post_status === 'publish' && (
                <li
                  key={item.ID}
                  className={`header-item${
                    item.ID === PAGE_TOP || item.ID === PAGE_HEADER
                      ? ' hidden'
                      : ''
                  }`}
                >
                  <Link
                    activeClass="active"
                    to={item.ID.toString()}
                    spy={true}
                    smooth={SCROLL_SMOOTHING}
                    offset={SCROLL_OFFSET}
                    duration={SCROLL_DURATION}
                    onSetActive={props.handleSetActive}
                  >
                    {item.title}
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  )
}
export default Header
