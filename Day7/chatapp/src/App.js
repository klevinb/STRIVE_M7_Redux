import React, { Component } from "react";
import "./App.css";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";
import io from "socket.io-client";

class App extends Component {
  socket = null;

  state = {
    username: "",
    message: "",
    sendToUser: "user1",
    messages: [],
    showModal: true,
  };

  componentDidMount = () => {
    const connectionOpt = {
      transports: ["websocket"],
    };
    this.socket = io("https://striveschool.herokuapp.com/", connectionOpt);
    this.socket.on("chatmessage", (msg) => {
      this.setState({ messages: this.state.messages.concat(msg) });
      console.log(msg);
    });

    this.socket.on("list", (data) => console.log(data));
  };

  setUsername = () => {
    this.socket.emit("setUsername", {
      username: this.state.username,
    });
  };

  setMessage = (e) => {
    this.setState({
      message: e.currentTarget.value,
    });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  sendMessage = () => {
    // e.preventDefault();

    this.socket.emit("chatmessage", {
      text: this.state.message,
      to: this.state.sendToUser,
    });
    this.setState({
      message: "",
      messages: [
        ...this.state.messages,
        {
          from: this.state.username,
          to: this.state.sendToUser,
          msg: this.state.message,
        },
      ],
    });
  };

  render() {
    return (
      <>
        <div className='App'>
          <ul id='messages'>
            {this.state.messages.map((msg, i) => (
              <>
                {this.state.username === msg.from &&
                this.state.sendToUser === msg.to ? (
                  <li key={i} className='text-right'>
                    {msg.msg}
                  </li>
                ) : (
                  this.state.sendToUser === msg.from && (
                    <li key={i} className='text-left'>
                      {msg.from} : {msg.msg}
                    </li>
                  )
                )}
              </>
            ))}
          </ul>

          <input
            autoComplete='off'
            value={this.state.message}
            onChange={this.setMessage}
          />
          <button onClick={() => this.sendMessage()}>Send</button>
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
              <Button
                onClick={() => {
                  this.toggleModal();
                  this.setUsername();
                }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default App;
