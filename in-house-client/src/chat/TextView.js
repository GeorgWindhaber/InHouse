import React from "react";

function ChatBubbles(props) {
  const chats = props.chatData;
  const myName = props.myName;

  var self = {
    textOrientation: " text-right",
    offset: " offset-2",
    textBox: " bg-primary text-white"
  };

  var otherUser = {
    textOrientation: " text-left",
    offset: "",
    textBox: " bg-light"
  };

  var server = {
    textOrientation: " text-center",
    offset: " offset-1",
    textBox: " bg-success text-white"
  };

  var messageStyle;
  var displayName;

  const chatMessages = chats.map(function(chat, i) {
    if (chat.user === "Server") {
      messageStyle = server;
      displayName = chat.name;
    } else if (chat.user) {
      messageStyle = otherUser;
      displayName = chat.name;
    } else {
      messageStyle = self;
      displayName = myName;
    }

    return (
      <div className={"row px-3" + messageStyle.textOrientation} key={i}>
        <div className={"col-10" + messageStyle.offset}>
          {displayName}
          <div
            className={"border rounded p-1 px-2 mb-3" + messageStyle.textBox}
          >
            {chat.message}
          </div>
        </div>
      </div>
    );
  });

  return <div className="border rounded p-3">{chatMessages}</div>;
}

class TextView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatData: props.chatData, myName: props.myName };
  }
  render() {
    return (
      <ChatBubbles chatData={this.state.chatData} myName={this.props.myName} />
    );
  }
}

export default TextView;
