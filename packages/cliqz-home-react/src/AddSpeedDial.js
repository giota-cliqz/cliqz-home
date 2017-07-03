import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import cliqz from './Cliqz';

class AddSpeedDial extends Component {
  constructor(props) {
    super(props);
    this.freshtab = cliqz.freshtab;
    this.state = {
      show: true,
      value: '',
      errorDuplicate: false,
      errorInvalid: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    this.setState({
      show: !this.state.show
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = this.state.value && this.state.value.trim();
    if(!url) {
      return;
    }

    return this.freshtab.addSpeedDial(url).then((resp) => {
      if(resp.error) {
        if(resp.reason === 'duplicate'){
          this.setState({
            errorDuplicate: true
          });
        } else {
          this.setState({
            errorInvalid: true
          });
        }
      } else {
        this.setState({
          value: ''
        });
        this.setState({
          show: !this.state.show
        });

        this.props.addSpeedDial(resp)
      }
      
    })
  }

  render() {
    return (
      <div>
        <ToggleDisplay show={this.state.show}>
          <a href="#" onClick={this.handleClick}>
            <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="FT2206" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="ft-square-logos" transform="translate(-977.000000, -270.000000)" fill="#CCC ">
                  <path d="M999,288 L999,270 L995,270 L995,288 L977,288 L977,292 L995,292 L995,310 L999,310 L999,292 L1017,292 L1017,288 L999,288 Z" id="plus"></path>
                </g>
              </g>
          </svg>
          </a>
        </ToggleDisplay>
        <ToggleDisplay hide={this.state.show}>
          <form name="addForm" 
                className="addDialForm"
                onSubmit={this.handleSubmit}>
            <a className="hideAddForm" onClick={this.handleClick}>
              <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="FT2906" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="delete-icon" transform="translate(-848.000000, -160.000000)">
                    <g transform="translate(848.000000, 160.000000)">
                      <circle id="Oval-16" fill="#FFFFFF" cx="10" cy="10" r="10"></circle>
                      <g id="x" transform="translate(3.000000, 3.000000)" fill="#CCC">
                        <rect id="Rectangle-25" transform="translate(7.000000, 7.000000) rotate(-315.000000) translate(-7.000000, -7.000000) " x="-1" y="6" width="16" height="2"></rect>
                        <rect id="Rectangle-25" transform="translate(7.000000, 7.000000) scale(-1, 1) rotate(-315.000000) translate(-7.000000, -7.000000) " x="-1" y="6" width="16" height="2"></rect>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
            <input name="addUrl" 
                   type="text"
                   className="addUrl"
                   placeholder="Enter address"
                   value={this.state.value}
                   onChange={this.handleChange} />
            {
              this.state.errorDuplicate &&
                <div className="notification">
                  Already exists
                </div>
            }

            {
              this.state.errorInvalid &&
                <div className="notification">
                  Not valid
                </div>
            }
            <button type="submit">Add</button>
          </form>
        </ToggleDisplay>
      </div>
    );
  }
}

export default AddSpeedDial;