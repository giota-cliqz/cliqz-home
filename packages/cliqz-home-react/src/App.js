import React, { Component } from 'react';
import cliqz from './Cliqz';
import UrlBar from './UrlBar';
import SpeedDialsRow from './SpeedDialsRow';
import News from './News';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 
    this.freshtab = cliqz.freshtab;
    this.state = {
      config: {},
      dials: {
        history: [],
        custom: []
      },
      news: {
        version: '',
        data: [],
      }    
    };

    this.getSpeedDials = this.getSpeedDials.bind(this);
    this.addSpeedDial = this.addSpeedDial.bind(this);
    this.removeSpeedDial = this.removeSpeedDial.bind(this);
  }

  componentDidMount() {
    this.getConfig();
    this.getSpeedDials();
    this.getNews();
  }

  getConfig() {
    this.freshtab.getConfig().then(config => {
      this.setState({
        config: config
      });
    });
  }

  getSpeedDials() {
    this.freshtab.getSpeedDials().then(dials => {
      this.setState({
        dials: dials
      });
    });
  }

  addSpeedDial(dial, index) {
    if(index === undefined){
      this.state.dials.custom.push(dial);
    } else {
      if (dial.custom) {
        this.state.dials.custom.splice(index, 0, dial);
      } else  {
        this.state.dials.history.splice(index, 0, dial);
      }
    }

    this.setState({
      dials: this.state.dials
    });
  }

  removeSpeedDial(dial, index) {
    const isCustom = dial.custom;
    let dialType = isCustom ? 'custom' : 'history';
    let newItems = this.state.dials[dialType].filter((item) => {
      return item != dial;
    });

    var obj = this.state.dials;
    obj[dialType] = newItems;
   
    this.setState({
      dials: obj
    });

    this.freshtab.removeSpeedDial(dial);
  }

  getNews() {
    this.freshtab.getNews().then((data) => {
      this.setState({
        news: {
          version: data.version,
          data: data.news,
        }
      });
    });
  }

  render() {
    return (
      <div id="app">
        <div id="home">
          <nav id="nav-left"></nav>
          <section id="content">
            <section id="top">
              <SpeedDialsRow 
                dials={this.state.dials.history} 
                type="history"
                removeSpeedDial={this.removeSpeedDial}
                addSpeedDial={this.addSpeedDial}
                getSpeedDials={this.getSpeedDials} />
              <SpeedDialsRow 
                dials={this.state.dials.custom} 
                type="custom"
                addSpeedDial={this.addSpeedDial}
                removeSpeedDial={this.removeSpeedDial} />
            </section>

            <section id="middle">
              <UrlBar />
            </section>

            <section id="bottom">
              <News news={this.state.news} />
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
