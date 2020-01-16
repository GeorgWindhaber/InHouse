import React from "react";
import ChatInput from "./ChatInput";
import NameInput from "./NameInput";
import TextView from "./TextView";

import io from "socket.io-client";
const endpoint = "192.168.0.17:4001";
const socket = io(endpoint);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatData: [],
      myName: "",
      apiResponse: ""
    };

    socket.on("initialize", data => {
      data.messages.map(message => {
        this.chatOutput(message);
      });
      this.setState({ myName: data.name });
    });

    socket.on("recieve message", data => {
      this.chatOutput(data);
    });

    socket.on("new user logged in", data => {
      this.chatOutput(data);
    });

    socket.on("name updated", data => {
      this.chatOutput(data);
    });
  }

  chatOutput = newChatText => {
    var cache = this.state.chatData;
    cache.push(newChatText);
    this.setState({ chatData: cache });
  };

  nameOutput = newNameText => {
    socket.emit("name changed", newNameText);
    this.setState({ myName: newNameText });
  };

  render() {
    return (
      <div>
        <div className="chatTextView p-3">
          <TextView chatData={this.state.chatData} myName={this.state.myName} />
        </div>

        <div className="chatInputs p-3 shadow-lg">
          <ChatInput chatOutput={this.chatOutput} socket={socket} />
          <NameInput nameOutput={this.nameOutput} name={this.state.myName} />
        </div>
      </div>
    );
  }
}

export default Chat;
