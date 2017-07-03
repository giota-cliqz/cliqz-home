import React, { Component } from 'react';
import SpeedDial from './SpeedDial';
import AddSpeedDial from './AddSpeedDial';
import cliqz from './Cliqz';

class SpeedDialsRow extends Component {
  constructor(props) {
    super(props);

    // this.closeUndo = this.closeUndo.bind(this);
    this.undoRemoval = this.undoRemoval.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  componentWillMount() {
    this.state = {
      isCustom: this.props.type === 'custom',
      showAddButton: () => {
        return (this.state.isCustom && this.state.displayAddBtn());
      },
      displayAddBtn: () => {
        return this.props.dials.length < 5;
      },
      removedItems: []
    }
  }

  removeSpeedDial(dial, index) {
    this.props.removeSpeedDial(dial, index);
    dial.removedAt = index;
    this.state.removedItems.push(dial);
    this.setState({
      removedItems: this.state.removedItems
    });

    cliqz.core.sendTelemetry({
      type: 'home',
      action: 'click',
      target_type: 'remove-' + (dial.custom ? 'custom' : 'history'),
      target_index: index
    });
  }

  closeUndo(type) {
    this.setState({
      removedItems: []
    });

    cliqz.core.sendTelemetry({
      type: 'home',
      action: 'click',
      target_type: 'close-' + type + '-undo'
    });
  }

  _reAddSpeedDial(dial) {
    const index = dial.removedAt;
    this.props.addSpeedDial(dial, index);
    cliqz.freshtab.addSpeedDial(dial.url, index).then(() => {
      let newItems = this.state.removedItems.filter((item) => {
        return item != dial;
      });
      this.setState({
        removedItems: newItems
      });
    })
  }

  undoRemoval() {
    const speedDial = this.state.removedItems.pop();
    const type = speedDial.custom ? 'custom' : 'history';

    if(speedDial.custom) {
      this._reAddSpeedDial.call(this, speedDial);
    } else {
      cliqz.freshtab.revertHistorySpeedDial(speedDial.url);
      this.props.addSpeedDial(speedDial, speedDial.removedAt);
    }

    cliqz.core.sendTelemetry({
      type: 'home',
      action: 'click',
      target_type: 'undo-' + type + '-remove'
    });
  }

  resetAll() {
    cliqz.freshtab.resetAllHistory().then( results => {
      this.closeUndo.call(this, 'history');
      this.props.getSpeedDials();
    })

    cliqz.core.sendTelemetry({
      type: 'home',
      action: 'click',
      target_type: 'reset-all-history'
    });
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
                        removeSpeedDial={this.removeSpeedDial.bind(this, dial, i)} />
            })
          }

          {this.state.showAddButton() &&
            <AddSpeedDial 
              addSpeedDial={this.props.addSpeedDial} />
          }
        </div>
        <div className="undoOptions">
          {this.state.removedItems.length > 0 &&
            <div>
              <span>
                {this.state.removedItems.length}
                site was removed
              </span>
              <a className="undo"
                 href="#"
                 onClick={this.undoRemoval}>
                 Undo
              </a>
              <a className="resetAll"
                 href="#"
                 onClick={this.resetAll}>
                 Reset all
              </a>
              <a className="closeUndo"
                 onClick={this.closeUndo.bind(this, this.props.type)}>
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="FT2906" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="delete-icon" transform="translate(-848.000000, -160.000000)">
                      <g transform="translate(848.000000, 160.000000)">
                        <circle id="Oval-16" fill="#F7F7F7" cx="10" cy="10" r="10"></circle>
                        <g id="x" transform="translate(3.000000, 3.000000)" fill="#CCC">
                            <rect id="Rectangle-25" transform="translate(7.000000, 7.000000) rotate(-315.000000) translate(-7.000000, -7.000000) " x="-1" y="6" width="16" height="2"></rect>
                            <rect id="Rectangle-25" transform="translate(7.000000, 7.000000) scale(-1, 1) rotate(-315.000000) translate(-7.000000, -7.000000) " x="-1" y="6" width="16" height="2"></rect>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SpeedDialsRow;