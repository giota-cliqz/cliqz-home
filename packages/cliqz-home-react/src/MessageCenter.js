import React, { Component } from 'react';
import TopMessages from './TopMessages';
import MiddleMessages from './MiddleMessages';


class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: [],
      middle: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let messages = nextProps.messages;
    const topMessages = [];
    const middleMessages = [];
    for(var i in messages) {
      if(messages[i].position === 'top') {
        topMessages.push(messages[i]);
      } else {
        middleMessages.push(messages[i]);
      }
    }
    this.setState({
      top: topMessages,
      middle: middleMessages
    });
  }

  addMessages(msgs) {
    msgs && Object.keys(msgs).forEach(messageId => {
      const message = msgs[messageId];
      this.messages.push(message);
    });

    //TODO send telemetry for showing the notification
  }

  render() {
   // console.log(this.state, "!!state")
    const position = this.props.position;
    if(position === 'top' && this.state.top.length > 0) {
      return <TopMessages messages={this.state.top}/>
    } else if(position === 'middle' && this.state.middle.length > 0) {
      return <MiddleMessages messages={this.state.middle} />
    } else {
      return null;
    }
  }
}

export default MessageCenter;