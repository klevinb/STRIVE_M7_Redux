import React, { Component } from "react";
import "./App.css";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";
import io from "socket.io-client";

class App extends Component {
  socket = null;

  state = {
    username: "",
    message: "",
    messages: [],
    showModal: true,
  };

  componentDidMount() {
    const connectionOpt = {
      transports: ["websocket"],
    };
    this.socket = io("https://striveschool.herokuapp.com/", connectionOpt);
    this.socket.on("bmsg", (msg) =>
      this.setState({ messages: this.state.messages.concat(msg) })
    );
  }

  setMessage = (e) => {
    this.setState({
      message: e.currentTarget.value,
    });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.message !== "") {
      this.socket.emit("bmsg", {
        user: this.state.username,
        message: this.state.message,
      });
      this.setState({ message: "" });
    }
  };

  render() {
    return (
      <>
        <div className='App'>
          <ul id='messages'>
            {this.state.messages.map((msg, i) => (
              <li
                key={i}
                className={
                  msg.user === this.state.username ? "text-right" : "text-left"
                }
              >
                {console.log(msg, this.state.username)}
                <strong>{msg.user}</strong> {msg.message}
              </li>
            ))}
          </ul>
          <form id='chat' onSubmit={this.sendMessage}>
            <input
              autoComplete='off'
              value={this.state.message}
              onChange={this.setMessage}
            />
            <button>Send</button>
          </form>
        </div>
        <Modal
          size='lg'
          centered
          show={this.state.showModal}
          onHide={this.toggleModal}
        >
          <Modal.Title>
            <div className='ml-4 mt-2'>Set Username</div>
          </Modal.Title>
          <Modal.Body>
            <Modal.Header>
              <InputGroup>
                <FormControl
                  onChange={(e) =>
                    this.setState({ username: e.currentTarget.value })
                  }
                />
              </InputGroup>
            </Modal.Header>
            <Modal.Footer>
              <Button onClick={this.toggleModal}>Submit</Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default App;
