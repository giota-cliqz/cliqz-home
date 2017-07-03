import React, { Component } from 'react';
import Logo from './Logo';

const styles = {
  position: 'relative'
}

class SpeedDial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <span className="speed-dial-wrap" style={styles}>
            <a href={this.props.dial.url} className="speed-dial">
              <Logo logo={this.props.dial.logo} />
              <span className="title">{this.props.dial.displayTitle}</span>
            </a>
            <a className="delete"
               onClick={this.props.removeSpeedDial.bind(this, this.props.dial)}>X</a>
          </span>
  }
}

export default SpeedDial;