import {useState, useEffect, useCallback} from "react"
import {nanoid} from "nanoid"
import io from "socket.io-client"

import Chat from "./components/Chat/Chat";
import ChatForm from "./components/ChatForm/ChatForm";
import SigninChatForm from "./components/SigninChatForm/SigninChatForm";

import './App.css';

const socket = io.connect("http://localhost:5000")

socket.on("connect", ()=> {
  console.log("Success connect");
})

function App() {

  const [nickname, setNickname] = useState("");
  const [messages, setMessage] = useState([])

  useEffect(()=> {
    socket.on("chat-message", (message)=> {
      setMessage(prevState => {
        const newMessage = {
          id: nanoid(),
          type: "user",
          message,
        };

        return [newMessage, ...prevState]
    })
  })}, [])

  const addNickname = useCallback(({name}) => setNickname(name), []);

  const addMessage = useCallback(({message})=> setMessage(prevState => {
    const newMessage = {
      id: nanoid(),
      type: "you",
      message,
    };

    socket.emit("chat-message", message);

    return [newMessage, ...prevState]
  }) , [])

  return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messages} />}
    </div>
  )
}

export default App;
