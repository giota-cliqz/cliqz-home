import React, { Component } from 'react';
import cliqz from './Cliqz';

class TopMessages extends Component {

  handleClose(id, handler) {    
    cliqz.freshtab.dismissMessage(id, handler);
    cliqz.storage.setState((prevState) => {
      delete prevState.messages[id];
      return {
        messages: prevState.messages
      }
    });
  }

  render() {
    return (
      <div id="notificationsBox">
        {
          this.props.messages.map((message, i) => {
            return <div className="notificationsCon clearfix" key={i}>
                      <div className="close">
                        <a href="#"
                           onClick={this.handleClose.bind(this, message.id, message.handler)}>
                          <img src="./close_icon.svg" />
                        </a>
                      </div>
                      <img className="logo"
                           width="40px"
                           src="./new-cliqz.png" />
                      <div className="text">
                        <h1>{message.title}</h1>
                        <p>{message.description}</p>
                      </div>
                    </div>
            })
        }
      </div>

    );
  }
}

export default TopMessages;