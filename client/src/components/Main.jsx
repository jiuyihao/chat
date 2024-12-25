import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import axios from "axios";
import { GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import SearchMessages from "./Chat/SearchMessages";

function Main() {
  const router = useRouter();
  const [{ userInfo, currentChatUser, messagesSearch }, dispatch] =
    useStateProvider();
  const [socketEvent, setsocketEvent] = useState(false);
  const socket = useRef();
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      router.push("/login");
    } else {
      const { password, username, avatarImage, id } = JSON.parse(
        localStorage.getItem("chat-app-user")
      );
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: {
          password,
          username,
          avatarImage,
          id,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo?.id);
      dispatch({
        type: reducerCases.SET_SOCKET,
        socket,
      });
    }
  }, [userInfo]);
  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });
      setsocketEvent(true);
    }
  }, [socket.current]);
  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );
      dispatch({
        type: reducerCases.SET_MESSAGES,
        messages,
      });
    };
    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser]);

  return (
    <div>
      <div className=" grid grid-cols-main h-screen w-screen max-h-screen overflow-hidden">
        <ChatList />
        {currentChatUser ? (
          <div
            className={messagesSearch ? "grid grid-cols-2" : " grid-cols-2 "}
          >
            <Chat />
            {messagesSearch && <SearchMessages />}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

export default Main;
