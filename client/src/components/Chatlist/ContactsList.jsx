import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [{ contactsPage }, dispatch] = useStateProvider();
  console.log(contactsPage);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS_ROUTE);
        setAllContacts(users);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  return (
    <div className=" h-full flex flex-col">
      <div className=" h-24 flex items-end px-3 py-4">
        <div className=" flex items-center gap-12 text-white">
          <BiArrowBack
            className=" cursor-pointer text-xl"
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
            }
          />
          <span>选择一位开始新的聊天吧</span>
        </div>
      </div>
      <div className=" bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
  
        {Object.entries(allContacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              <div className=" text-teal-light pl-10 py-5">{initialLetter}</div>
              {
              userList.map((contact) => {
                return (
                  <ChatLIstItem
                    data={contact}
                    isContactsPage={true}
                    key={contact.id}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
