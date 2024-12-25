import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";
import ChangeInfo from "../common/changeInfo";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const [isContextMEnuVIsible, setIsContextMEnuVisible] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setIsContextMEnuVisible(true);
  };
  const contextMenuOptions = [
    {
      name: "修改个人信息",
      callback: () => {
        setShowChange(true);
      },
    },
    {
      name: "退出登录",
      callback: () => {
        localStorage.clear();
        window.location.reload();
      },
    },
  ];
  const handleAllContactsPage = () => {
    dispatch({
      type: reducerCases.SET_ALL_CONTACTS_PAGE,
    });
  };

  return (
    <div className=" h-16 px-4 py-3 flex justify-between items-center">
      <div className=" cursor-pointer">
        <Avatar type="sm" image={userInfo?.avatarImage} />
      </div>
      <div className=" flex gap-6">
        <BsFillChatLeftFill
          className=" text-xl text-panel-header-icon cursor-pointer"
          title="新聊天"
          onClick={handleAllContactsPage}
        />
        <>
          <BsThreeDotsVertical
            className=" text-xl text-panel-header-icon cursor-pointer"
            title="菜单"
            onClick={(e) => showContextMenu(e)}
            id="menu"
          />
        </>
      </div>
      {isContextMEnuVIsible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu={isContextMEnuVIsible}
          setContextMenu={setIsContextMEnuVisible}
          id="menu"
        />
      )}
      {showChange && (
        <ChangeInfo  setShowChange={setShowChange} />
      )}
    </div>
  );
}

export default ChatListHeader;


