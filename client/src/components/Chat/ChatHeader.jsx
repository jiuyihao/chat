import React, { useReducer, useState } from "react";
import Avatar from "../common/Avatar";
import { BiSearchAlt2 } from "react-icons/bi";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";

function ChatHeader() {
  const router = useRouter();
  const [{ currentChatUser }, dispatch] = useStateProvider();


  return (
    <div className=" h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className=" flex items-center justify-center gap-6">
        <Avatar type="sm" image={currentChatUser?.avatarImage} />
        <div className=" flex flex-col">
          <span className=" text-primary-strong">{currentChatUser?.name}</span>
          <span className=" text-secondary text-xs">在线/离线</span>
        </div>
      </div>
      <div className=" flex gap-6">
        <BiSearchAlt2
          title="搜索"
          onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })}
          className=" text-panel-header-icon text-xl cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ChatHeader;
