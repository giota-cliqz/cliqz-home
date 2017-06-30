import React, { Component } from 'react';
import SpeedDial from './SpeedDial';
import AddSpeedDial from './AddSpeedDial';

class SpeedDialsRow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.state = {
      isCustom: this.props.type === 'custom',
      showAddButton: () => {
        return (this.state.isCustom && this.state.displayAddBtn());
      },
      displayAddBtn: () => {
        return this.props.dials.length < 5;
      }
    }
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

          {this.state.showAddButton() &&
            <AddSpeedDial 
              addSpeedDial={this.props.addSpeedDial} />
          }
        </div>
      </div>
    );
  }
}

export default SpeedDialsRow;