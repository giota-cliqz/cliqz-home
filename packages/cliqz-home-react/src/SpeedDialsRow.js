import React, { Component } from 'react';
import SpeedDial from './SpeedDial';

class SpeedDialsRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 className="speedDialLabel">Label to be localized</h3>
        <div className="speed-dial-row">
          {
            this.props.dials.slice(0,5).map(function(dial, i) {
              return <SpeedDial key={i} dial={dial} />
              
            })
          }
        </div>
      </div>
    );
  }
}

export default SpeedDialsRow;