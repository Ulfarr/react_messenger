import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
      activeRoom: '',
      user: ''
    };
    this.activateRoom = this.activateRoom.bind(this);
  }

  activateRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
    if (user !== null) {console.log(user.displayName)};
  }

  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        < User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
        < RoomList firebase={firebase} activeRoom={this.state.activeRoom} activateRoom={this.activateRoom.bind(this)}/>
        < MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
      </div>
    );
  }
}


export default App;