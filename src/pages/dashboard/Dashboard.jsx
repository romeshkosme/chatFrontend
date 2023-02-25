import React, { useState } from "react";
import avatar from "../../assets/avatar.png";
import logoutImg from "../../assets/logout.png";
import SearchPeople from "../../components/SearchPeople";
import Chat from "../../components/Chat";
import { useAuth } from "../../hooks/useAuth";

function Dashboard() {
  const [chatId, setChatId] = useState("");
  const [chatName, setChatName] = useState("");
  const auth = useAuth();
  return (
    <>
      <div className="bg-[#EFF6FC] h-[100vh] flex justify-center items-center">
        <div className="flex gap-x-4">
          {/* menu */}
          <div className="bg-[#6E00FF] max-w-[133px] h-[90vh] rounded-md flex flex-col justify-between p-4">
            <img src={avatar} className="h-[64px]" />
            <img
              src={logoutImg}
              className="cursor-pointer"
              onClick={() => auth.signout()}
            />
          </div>
          {/* search group people */}
          <SearchPeople setChatId={setChatId} setChatName={setChatName} />
          {/* chat */}
          <Chat chatId={chatId} chatName={chatName} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
