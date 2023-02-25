import React, { useState, useEffect } from "react";
import searchIcon from "../assets/search.png";
import avatar from "../assets/avatar.png";
import { getSender } from "../utils/helpers";
import threeDotImg from "../assets/three-dot.png";
import { getAllChat, createGet } from "../api/chat.api";
import { searchUser } from "../api/user.api";
import { useAuth } from "../hooks/useAuth";
import DateTime from "./DateTime";

function SearchPeople(props) {
  const { user, signout } = useAuth();
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const getData = setTimeout(() => {
      if (search && search.length > 4) {
        searchUser(search).then((response) => {
          setSearchResult(response.users);
        });
      } else if (!search || search.length === 0) {
        setSearchResult([]);
        fetchAllChats();
      }
    }, 800);
    return () => clearTimeout(getData);
  }, [search]);
  const fetchAllChats = () => {
    getAllChat().then((response) => {
      setChats(response);
    });
  };
  const handleCreateChat = (userId) => {
    createGet({ userId }).then((response) => {
      props.setChatId(response._id);
    });
  };
  return (
    <div className="flex flex-col gap-y-4">
      {/* search */}
      <div className="bg-[#1D3557] flex justify-between rounded-md p-2 w-[400px] items-center">
        <img src={avatar} className="h-[43px]" />
        <div className="relative">
          <img
            src={threeDotImg}
            className="h-[28px] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute bg-[#457b9d] w-[150px]">
              <ul className="text-[#f1faee]">
                <li className="py-2 px-3 hover:bg-[#1d3557] cursor-pointer">
                  Create a Group
                </li>
                <li
                  className="py-2 px-3 hover:bg-[#1d3557] cursor-pointer"
                  onClick={signout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* people */}
      <div className="bg-[#1D3557] flex flex-col rounded-md py-3 px-3 w-[400px]">
        <div className="bg-[#457B9D] flex rounded-md items-center">
          <img src={searchIcon} className="h-[30px] p-1" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="ml-2 focus:outline-none flex-1 bg-[#457B9D] text-[#F1FAEE] placeholder:text-[#A8DADC]"
          />
        </div>
        {/* people list */}
        <div className="mt-3">
          {!search &&
            chats.map((chat) => {
              return (
                !chat.isGroupChat && (
                  <div
                    className="flex gap-x-3 cursor-pointer border-t border-[#457B9D] py-2 px-2 hover:bg-[#457B9D]"
                    onClick={() => {
                      props.setChatId(chat._id);
                      props.setChatName(getSender(user._id, chat.users));
                    }}
                    key={chat._id}
                  >
                    <img src={avatar} className="h-[50px]" />
                    <div className="flex w-[100%] justify-between">
                      <div>
                        <h4 className="font-[500] text-[#F1FAEE]">
                          {getSender(user._id, chat.users)}
                        </h4>
                        <p className="text-[#A8DADC] text-sm">
                          {chat?.latestMessage?.content}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#A8DADC] text-sm">
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
