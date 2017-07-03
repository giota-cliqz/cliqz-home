import React, { Component } from 'react';
import SpeedDial from './SpeedDial';
import AddSpeedDial from './AddSpeedDial';

class SpeedDialsRow extends Component {
  constructor(props) {
    super(props);

    //this.removeSpeedDial = this.removeSpeedDial.bind(this);
  }

  // removeSpeedDial(dial, index) {
  //   //TODO parent with index
  //   console.log(index, "!!index")
  //   this.props.removeSpeedDial(dial, index)
  // }

  componentWillMount() {
    this.state = {
      isCustom: this.props.type === 'custom',
      showAddButton: () => {
        return (this.state.isCustom && this.state.displayAddBtn());
      },
      displayAddBtn: () => {
        return this.props.dials.length < 5;
      },
      removedSpeedDials: []
    }
  }

  render() {
    return (
      <div>
        <h3 className="speedDialLabel">Label to be localized</h3>
        <div className="speed-dial-row">
          {
            this.props.dials.slice(0,5).map((dial, i) => {
              return <SpeedDial 
                        key={i} 
                        dial={dial}
                        removeSpeedDial={this.props.removeSpeedDial.bind(this, dial, i)} />
            })
          }

          {this.state.showAddButton() &&
            <AddSpeedDial 
              addSpeedDial={this.props.addSpeedDial} />
          }
        </div>
        <div className="undoOptions">

        </div>
      </div>
    );
  }
}

export default SpeedDialsRow;