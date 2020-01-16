import React from "react";

class NameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", name: props.name, buttonDisabled: true };
  }

  inputChangeHandler = event => {
    this.setState({
      text: event.target.value,
      buttonDisabled: event.target.value === this.props.name
    });
  };

  submitHandler = event => {
    event.preventDefault();

    this.setState({ buttonDisabled: true });

    if (this.state.text.trim().length) {
      this.props.nameOutput(this.state.text);
    }
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        Your Name: {this.props.name}
        <div className="row form-group">
          <input
            type="text"
            name="text"
            className="form-control col-10"
            value={this.state.text}
            placeholder="Change your name here... "
            onInput={this.inputChangeHandler}
          />
          <button
            className="btn btn-primary col-2"
            type="submit"
            disabled={this.state.buttonDisabled}
          >
            Update
          </button>
        </div>
      </form>
    );
  }
}

export default NameInput;
