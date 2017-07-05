import React, { Component } from 'react';
import cliqz from './Cliqz';

class MiddleMessages extends Component {

  handleClose(id) {    
    cliqz.freshtab.dismissMessage(id);
    cliqz.storage.setState((prevState) => {
      delete prevState.messages[id];
      return {
        messages: prevState.messages
      }
    });
  }

  render() {
    return (
      <div>
        {
          this.props.messages.map((message, i) => {
            return <div>
              <h1>{message.title}</h1>
              <p>{message.description}</p>
            </div>
            })
        }
      </div>

    );
  }
}

export default MiddleMessages;