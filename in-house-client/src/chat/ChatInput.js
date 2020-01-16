import React from "react";

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  inputChangeHandler = event => {
    this.setState({ text: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();

    if (this.state.text.trim().length) {
      this.props.chatOutput({ message: this.state.text, user: null });

      this.props.socket.emit("send message", this.state.text);
    }

    this.setState({ text: "" });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div className="row form-group">
          <input
            type="text"
            name="text"
            className="form-control col-10"
            placeholder="Text..."
            onChange={this.inputChangeHandler}
            value={this.state.text}
          />
          <button className="btn btn-primary col-2" type="submit">
            Senden
          </button>
        </div>
      </form>
    );
  }
}

export default ChatInput;
