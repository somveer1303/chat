import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../infoBar/infoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import "./Chat.css";
const ENDPOINT = "https://she-chat.herokuapp.com/";
let socket;
socket = io(ENDPOINT);

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log("name and romm: ", name, room);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});
    // console.log(location.search);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      console.log(message);
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          setMessage={setMessage}
          message={message}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
