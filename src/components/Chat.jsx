import React, { memo, useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import attachmentIcon from "../assets/attachment.png";
import smileyIcon from "../assets/smiley.png";
import cameraIcon from "../assets/camera.png";
// import micIcon from "../assets/mic.png";
import sendIcon from "../assets/send.png";
import { getAllMessages, sendMessage } from "../api/message.api";
import io from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

const ENDPOINT = import.meta.env.VITE_ENDPOINT
let socket, selectedChatCompare;

function Chat(props) {
  const { user } = useAuth();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  console.log("chat component VITE_ENDPOINT - ", import.meta.env.VITE_ENDPOINT)
  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user._id);
      socket.on("connection", () => setSocketConnected(true));
    }
  }, [user]);
  useEffect(() => {
    if (props.chatId) {
      getAllMessages(props.chatId).then((response) => {
        setMessages(response);
        socket.emit("join chat", props.chatId);
      });
      selectedChatCompare = props.chatId;
    } else {
      // getAllMessages().then((response) => {
      //   setMessages(response);
      //   socket.emit("join chat", props.chatId);
      // });
      // selectedChatCompare = props.chatId;
    }
  }, [props.chatId]);
  useEffect(() => {
    if (socket) {
      socket.on("message recieved", (newMsg) => {
        if (!selectedChatCompare || selectedChatCompare !== newMsg.chat._id) {
        } else {
          setMessages([...messages, newMsg]);
        }
      });
    }
  });
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (msg && props.chatId) {
      setMsg("");
      sendMessage({ content: msg, chatId: props.chatId }).then((response) => {
        socket.emit("new message", response);
        setMessages([...messages, response]);
      });
    }
  };
  return (
    <div className="bg-white sm:w-[750px] h-[90vh] max-w-[950px] rounded-md p-4 flex flex-col">
      {/* header */}
      {props.chatId ? (
        <>
          <div className="flex items-center gap-x-2 mb-3">
            <img src={avatar} className="w-[65px]" />
            <div>
              <h2 className="font-[500]">Sameer</h2>
              <span className="text-gray-400 text-sm">
                Online | Last seen, 2:02pm
              </span>
            </div>
          </div>
          <hr />
          {/* chat area */}
          <div className="flex-1 mt-3 overflow-y-auto">
            <div className="flex flex-col gap-y-3 w-full">
              {messages &&
                messages.length > 0 &&
                messages.map((message) => (
                  <div
                    className={`mt-2 ${
                      message.sender._id === user._id ? "ml-auto " : ""
                    }`}
                    key={message._id}
                  >
                    <span
                      className={`${
                        message.sender._id === user._id
                          ? "bg-[#6E00FF] text-white"
                          : "bg-[#E7E7E7]"
                      }  w-max px-3 py-2 rounded-lg`}
                    >
                      {message.content}
                    </span>
                  </div>
                ))}
              {/* <div className="mt-2 flex flex-col">
            <span className="bg-[#E7E7E7] w-max px-3 py-2 rounded-lg">
              How are you?
            </span>
            <span className="text-sm text-gray-400">Today, 8.02am</span>
          </div>
          <div className="mt-2 ml-auto">
            <span className="bg-[#6E00FF] text-white w-max px-3 py-2 rounded-lg">
              Hey there!
            </span>
          </div>
          <div className="mt-2 ml-auto flex flex-col">
            <span className="bg-[#6E00FF] text-white w-max px-3 py-2 rounded-lg">
              How are you?
            </span>
            <span className="text-sm text-gray-400">Today, 8.02am</span>
          </div>
          <div className="mt-2">
            <span className="bg-[#E7E7E7] w-max px-3 py-2 rounded-lg">
              Hey there!
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="bg-[#E7E7E7] w-max px-3 py-2 rounded-lg">
              How are you?
            </span>
            <span className="text-sm text-gray-400">Today, 8.02am</span>
          </div>
          <div className="mt-2 ml-auto">
            <span className="bg-[#6E00FF] text-white w-max px-3 py-2 rounded-lg">
              Hey there!
            </span>
          </div>
          <div className="mt-2 ml-auto flex flex-col">
            <span className="bg-[#6E00FF] text-white w-max px-3 py-2 rounded-lg">
              How are you?
            </span>
            <span className="text-sm text-gray-400">Today, 8.02am</span>
          </div>
          <div className="mt-2">
            <span className="bg-[#E7E7E7] w-max px-3 py-2 rounded-lg">
              Hey there!
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="bg-[#E7E7E7] w-max px-3 py-2 rounded-lg">
              How are you?
            </span>
            <span className="text-sm text-gray-400">Today, 8.02am</span>
          </div>
          <div className="mt-2 ml-auto">
            <span className="bg-[#6E00FF] text-white w-max px-3 py-2 rounded-lg">
              Hey there!
            </span>
          </div>
          <div className="mt-2 ml-auto flex flex-col">
            <span className="bg-[#6E00FF] text-white w-max px-3 py-2 rounded-lg">
              How are you?
            </span>
            <span className="text-sm text-gray-400">Today, 8.02am</span>
          </div> */}
            </div>
          </div>
          {/* typing area */}
          <div className="mt-4 flex gap-x-2">
            {/* input */}
            <div className="bg-[#EFF6FC] rounded-md flex justify-around p-2 w-full">
              <img src={attachmentIcon} className="h-[28px]" />
              <input
                placeholder="Type your message here..."
                className="bg-transparent focus:outline-none ml-3 flex-[0.9]"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <img src={smileyIcon} className="h-[28px]" />
              <img src={cameraIcon} className="h-[28px] ml-2" />
            </div>
            <div className="bg-[#6E00FF] rounded-md h-[46px] w-[46px] flex justify-center items-center cursor-pointer">
              <img
                src={sendIcon}
                className="h-[28px]"
                onClick={handleSubmitMessage}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <h3 className="text-3xl font-[500]">Welcome</h3>
            <p className="text-gray-400">Select the user to chat</p>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Chat);
