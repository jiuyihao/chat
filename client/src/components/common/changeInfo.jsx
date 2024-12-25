import React, { useState } from "react";
import Input from "@/components/common/Input";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { CHANGE_ROUTE } from "@/utils/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "./Avatar";

function ChangeInfo({ setShowChange }) {
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const { id } = JSON.parse(localStorage.getItem("chat-app-user"));
  const handleValidation = () => {
    if (password.length < 6) {
      toast.error("密码长度应大于6.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(CHANGE_ROUTE, {
        password,
        about,
        name,
        id,
        avatarImage: image
      });

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        setShowChange(false);
      }
    }
  };

  return (
    <div className=" z-50 fixed top-0 left-0 max-h-[100vh] max-w-[100vw] w-full h-full flex justify-center items-center ">
      <div className="  h-max w-max bg-gray-900 gap-3 rounded-lg p-4">
        <div className=" pt-2 pe-2   ">
          <IoClose
            onClick={() => setShowChange(false)}
            className=" h-10 w-10 cursor-pointer"
          />
        </div>
        <div className=" flex justify-center items-center  gap-3 pt-10 pb-10 px-20 w-full">
          <div>
            <Input name="新用户名" state={name} setState={setName} label />
            <Input name="个性签名" state={about} setState={setAbout} label />
            <Input
              name="新密码"
              state={password}
              setState={setPassword}
              label
              password
            />
          </div>
        </div>
        <div className=" flex items-center justify-center  pb-5">
          <button
            onClick={handleSubmit}
            className=" flex justify-center items-center gap-7 bg-login p-5 rounded-lg"
          >
            提交
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChangeInfo;
