import React, { Component } from 'react';
import Logo from './Logo';


class SpeedDial extends Component {
  render() {
    return <a href={this.props.dial.url} className="speed-dial">
              <Logo logo={this.props.dial.logo} />
              <span className="title">{this.props.dial.displayTitle}</span>
           </a>
  }
}

export default SpeedDial;