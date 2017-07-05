import Spanan from 'spanan';
import MessageCenter from './MessageCenter';

 function createSpananForModule (moduleName) {
  return new Spanan(({ uuid, functionName, args }) => {
    const message = JSON.stringify({
      target: 'cliqz',
      module: moduleName,
      action: functionName,
      requestId: uuid,
      args
    })
    window.postMessage(message, '*')
  });
}

let INSTANCE = null;

class Cliqz  {
  constructor(props) {
    const freshtab = createSpananForModule('freshtab');
    const core = createSpananForModule('core');
    window.addEventListener('message', event => {
      let message = {};

      try {
        message = JSON.parse(event.data);
      } catch(e) {
        // non CLIQZ or invalid message should be ignored
      }

      if(message.action === 'addMessage') {
        if (this.storage) {
          this.storage.setState(function (prevState) {
            return {
              messages: {
                ...prevState.messages,
                [message.message.id]: message.message,
              }
            }
          })
        }
      }

      if (message.type !== 'response') {
        return;
      }

      freshtab.dispatch({
        uuid: message.requestId,
        returnedValue: message.response
      });

      core.dispatch({
        uuid: message.requestId,
        returnedValue: message.response,
      });

    });

    this.freshtab = freshtab.createProxy();
    this.core = core.createProxy();
  }

  setStorage(storage) {
    this.storage = storage;
  }

  static getInstance() {
    if (!INSTANCE) {
      INSTANCE = new Cliqz();
    }

    return INSTANCE;
  }
}


export default Cliqz.getInstance();
