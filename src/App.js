import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import RoomList from './components/RoomList';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUUon38Q3ticyydIaHuaI4XeHmMeW3vwc",
    authDomain: "messaging-app-89908.firebaseapp.com",
    databaseURL: "https://messaging-app-89908.firebaseio.com",
    projectId: "messaging-app-89908",
    storageBucket: "messaging-app-89908.appspot.com",
    messagingSenderId: "382519844522"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      user: null
    };
  }

  activateRoom(room) {
    this.setState({ activeRoom: room });
  }
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        < RoomList firebase={firebase} activeRoom={this.state.activeRoom} activateRoom={this.activateRoom.bind(this)}/>/>
      </div>
    );
  }
}

export default App;