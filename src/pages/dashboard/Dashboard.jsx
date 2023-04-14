import React, { useState } from "react";
import SearchPeople from "../../components/SearchPeople";
import Chat from "../../components/Chat";
import { useAuth } from "../../hooks/useAuth";

function Dashboard() {
  const [chatId, setChatId] = useState("");
  const [chatName, setChatName] = useState("");
  const auth = useAuth();
  return (
    <>
      <div className="bg-[#a8dadc] h-[100vh] flex justify-center items-center">
        <div className="flex gap-x-4">
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
