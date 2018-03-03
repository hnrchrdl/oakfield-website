import './Toastr.css'

import React, { Component } from 'react'

export default class Toastr extends Component {
    render() {
        const className = `toastr-container ${this.props.messages ? '' : ' hidden'}`
        return <div className={className}>
            {this.props.messages.map(({ message, error }, idx) => this.renderToast(idx, message, error))}
        </div>

    }
    renderToast(idx, message, error) {
        const className = `toastr ${error ? ' toastr-error' : ' toastr-success'}`
        return <div key={idx} className={className}>{message}</div>;
    }
}