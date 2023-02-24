import React, { useState, useEffect } from "react";
import searchIcon from "../assets/search.png";
import avatar from "../assets/avatar.png";
import { getSender } from "../utils/helpers";
import { getAllMessages } from "../api/message.api";
import { getAllChat, createGet } from "../api/chat.api";
import { searchUser } from "../api/user.api";
import { useAuth } from "../hooks/useAuth";
import DateTime from "./DateTime";

function SearchPeople(props) {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    getAllChat().then((response) => {
      setChats(response);
    });
  }, []);
  useEffect(() => {
    const getData = setTimeout(() => {
      if (search && search.length > 5) {
        searchUser(search).then((response) => {
          setSearchResult(response.users);
        });
      }
    }, 800);
    return () => clearTimeout(getData);
  }, [search]);
  const handleCreateChat = (userId) => {
    createGet({ userId }).then((response) => {
      props.setChatId(response._id);
    });
  };
  return (
    <div className="flex flex-col gap-y-4">
      {/* search */}
      <div className="bg-[#fff] flex rounded-md p-2 w-[400px]">
        <img src={searchIcon} className="h-[43px]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="ml-2 focus:outline-none"
        />
      </div>
      {/* group */}
      {/* <div className="bg-[#fff] flex flex-col rounded-md py-3 px-3 w-[400px]">
        <h3 className="font-[600] text-[20px]">Groups</h3>
        <div className="mt-3">
          {chats.map((chat) => {
            return (
              chat.isGroupChat && (
                <div
                  className="flex gap-x-3 cursor-pointer"
                  onClick={() => props.setChatId(chat._id)}
                  key={chat._id}
                >
                  <img src={avatar} className="h-[50px]" />
                  <div className="flex w-[100%] justify-between">
                    <div>
                      <h4 className="font-[500]">{chat.chatName}</h4>
                      <p className="text-gray-400 text-sm">Why?</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">
                        Today, 9.52pm
                      </span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div> */}
      {/* people */}
      <div className="bg-[#fff] flex flex-col rounded-md py-3 px-3 w-[400px]">
        <h3 className="font-[600] text-[20px]">People</h3>
        {/* people list */}
        <div className="mt-3">
          {!search &&
            chats.map((chat) => {
              return (
                !chat.isGroupChat && (
                  <div
                    className="flex gap-x-3 cursor-pointer border-t border-gray-200 py-2 px-2 hover:bg-gray-100"
                    onClick={() => props.setChatId(chat._id)}
                    key={chat._id}
                  >
                    <img src={avatar} className="h-[50px]" />
                    <div className="flex w-[100%] justify-between">
                      <div>
                        <h4 className="font-[500]">
                          {getSender(user._id, chat.users)}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {chat?.latestMessage?.content}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">
                          <DateTime dateTime={chat.createdAt} />
                        </span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          {search &&
            searchResult.map((user) => (
              <div
                className="flex gap-x-3 cursor-pointer"
                onClick={() => handleCreateChat(user._id)}
                key={user._id}
              >
                <img src={avatar} className="h-[50px]" />
                <div className="flex w-[100%] justify-between">
                  <div>
                    <h4 className="font-[500]">{user.username}</h4>
                    <p className="text-gray-400 text-sm">Why?</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Today, 9.52pm</span>
                    <span></span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPeople;
