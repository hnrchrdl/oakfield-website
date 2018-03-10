import './Header.css'

import {
  PAGE_HEADER,
  PAGE_TOP,
  SCROLL_DURATION,
  SCROLL_OFFSET,
  SCROLL_SMOOTHING
} from '../env'
import React, { Component } from 'react'

import BurgerIcon from '../graphics/icon-burger'
import ExitIcon from '../graphics/icon-exit'
import { Link } from 'react-scroll'
import OverlayLogo from '../graphics/overlay-logo'

export class Header extends Component {
  state = {
    showMenu: false
  }

  render() {
    return (
      <div
        className={
          'header-wrapper' +
          (this.props.fixed ? ' fixed' : '') +
          (this.props.hidden ? ' hidden' : '')
        }
      >
        {this.props.fixed && (
          <div className="logo">
            <Link
              to={PAGE_TOP}
              spy={false}
              smooth={SCROLL_SMOOTHING}
              offset={SCROLL_OFFSET}
              duration={SCROLL_DURATION}
              onSetActive={this.props.handleSetActive}
            >
              {/* O A K F I E L D */}
              {/* <HeaderLogo style={{ fill: '#222' }} /> */}
              <OverlayLogo style={{ fill: '#222' }} height="100%" />
            </Link>
          </div>
        )}
        <div className="header-items big">{this.renderHeaderItems()}</div>
        <div className="header-items small">
          <ul>
            <li className="header-item">
              <div className="burger-wrapper" onClick={_ => this.showMenu()}>
                <BurgerIcon />
              </div>
            </li>
          </ul>
        </div>
        <div className={`alt-menu${this.state.showMenu ? '' : ' collapsed'}`}>
          {this.renderHeaderItems()}
          <div className="close" onClick={_ => this.hideMenu()}>
            <ExitIcon />
          </div>
        </div>
      </div>
    )
  }

  hideMenu() {
    setTimeout(_ => {
      this.setState({ showMenu: false })
    }, 100)
  }

  showMenu() {
    document.addEventListener('mousedown', this.handleDocumentClick)
    this.setState({ showMenu: true })
  }

  handleDocumentClick = () => {
    document.removeEventListener('mousedown', this.handleDocumentClick)
    setTimeout(_ => {
      this.hideMenu()
    }, 50)
  }

  renderHeaderItems() {
    return (
      <ul>
        {[
          ...this.props.mainMenuItems,
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
                  onSetActive={this.props.handleSetActive}
                >
                  {item.title}
                </Link>
              </li>
            )
        )}
      </ul>
    )
  }
}
export default Header
