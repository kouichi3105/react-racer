import './App.css';
import React from 'react';
import { Button } from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import TextField from '@material-ui/core/TextField';

const style = { width: 400, margin: 50};

export class App extends React.Component {

  constructor(props){
    super();
    this.state = {
      post: '',
      sliderValues: 0,
      st_value: 50,
      address: ''
    };

    this.onReset = this.onReset.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  handleChange_address = (event) => {
    this.setState({
      address: event.target.value
    });
  }

  onReset() {
    this.setState({post: '', value: 0, st_value: 50});
  }

  onSend() {
    // Speed値設定
    fetch(this.state.address + '/speed/' + String(this.state.value), {
      method: "POST",
      body: "Speed"
    }).then(response => response.text())
    .then(text => {
      // this.setState({post: text});
    });
    // Steering値設定
    fetch(this.state.address + '/steering/' + String(this.state.st_value), {
      method: "POST",
      body: "Steering"
    }).then(response => response.text())
    .then(text => {
      // this.setState({post: text});
    });
  }

  onSliderChange = (value) => {
    this.setState({
      value,
    });
  }

  onAfterChange = (value) => {
    // Speed値設定
    fetch(this.state.address + '/speed/' + String(value), {
      method: "POST",
      body: "Speed"
    }).then(response => response.text())
    .then(text => {
      this.setState({post: text});
    });
  }

  onStSliderChange = (st_value) => {
    this.setState({
      st_value,
    });
  }

  onStAfterChange = (st_value) => {
    // Steering値設定
    fetch(this.state.address + '/steering/' + String(st_value), {
      method: "POST",
      body: "Steering"
    }).then(response => response.text())
    .then(text => {
      this.setState({post: text});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <title>React Racer</title>
          <h1>React Racer</h1>
          <div style={style}>
            <p>Speed</p>
            <Slider 
              value={this.state.value}
              onChange={this.onSliderChange}
              onAfterChange={this.onAfterChange}
            />
            <p>Steering</p>
            <Slider 
              value={this.state.st_value}
              onChange={this.onStSliderChange}
              onAfterChange={this.onStAfterChange}
            />
            <DriveEtaIcon />
          </div>
          <form className="form" noValidate autoComplete="off">
            <TextField 
              id="standard-basic" 
              label="Address"
              onChange={this.handleChange_address}
            />
          </form>
          <p>{this.state.post}</p>
          <div>
            <Button className="reset" variant="contained" color="secondary" onClick={this.onReset}>Reset</Button>
            <Button className="send" variant="contained" color="primary" onClick={this.onSend}>Send</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
