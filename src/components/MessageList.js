import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        messages: [],
        currentRoomMessages: [],
        newMessageContent: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.filterAndDisplayMessages = this.filterAndDisplayMessages.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoom !== this.props.activeRoom) {
      this.filterAndDisplayMessages( nextProps.activeRoom );
    }
  }


  createMessage(newMessageContent) {
    if (!this.props.activeRoom || !this.props.user) {return};

    this.messagesRef.push({
      username: this.props.user.displayName,
      content: this.state.newMessageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });
    this.setState({ newMessageContent: '' });
  }

  handleContentChange(event) {
    event.preventDefault();
    this.setState({newMessageContent: event.target.value });
  }


  filterAndDisplayMessages(activeRoom) {
    this.setState({ currentRoomMessages: this.state.messages.filter(message => message.roomId === activeRoom.key) });
  }

  currentRoomMessages() {
    return this.state.messages.filter(message => {
      return message.roomId === this.props.activeRoom.key;
    });
  }

  render() {
    return (
      <div className="messages">
        <form className="create-message" onSubmit={() => this.createMessage(this.state.newMessageContent)}>
          <input type="text" value={this.state.newMessageContent} onChange={this.handleContentChange}/>
          <button type="submit">Create Message</button>
        </form>
        <h2>Messages</h2>
        <div className="messages-list">
          {
            this.currentRoomMessages().map(message => {
              return (
                <div key={message.key} className="message">
                <h5>{message.username} on {message.sentAt} - {message.content}</h5>
              </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default MessageList;